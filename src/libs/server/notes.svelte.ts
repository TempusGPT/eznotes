import type { Database } from "./types";
import { supabase } from "./supabase";

export type Note = Omit<Database["public"]["Tables"]["notes"]["Row"], "owner">;

let notes = $state<Note[]>([]);

supabase.auth.getSession().then((res) => {
    const user = res.data.session?.user;

    supabase
        .schema("public")
        .from("notes")
        .select("*")
        .eq("owner", user?.id ?? "")
        .then((res) => (notes = res.data ?? []));
});

export const findNote = (id: string) => {
    return notes.find((note) => note.id === id);
};

export const searchNotes = (query: string) => {
    return notes.filter((note) => note.name.toLowerCase().includes(query.toLowerCase()));
};

export const notesOf = (path: string) => {
    return notes.filter((note) => note.path === path);
};

export const foldersOf = (path: string): Set<string> => {
    return new Set(
        notes
            .filter((note) => note.path !== path && note.path.startsWith(path))
            .map((note) => note.path.replace(path, "").split("/")[0]),
    );
};

export const createNote = async (path: string, name: string) => {
    const { data } = await supabase.from("notes").insert({ path, name }).select("*").maybeSingle();
    if (!data) {
        return;
    }

    notes.push(data);
    return data.id;
};

export const editNote = async (id: string, content: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        note.content = content;
        await supabase.from("notes").update({ content }).eq("id", id);
    }
};

export const renameNote = async (id: string, name: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        note.name = name;
        await supabase.from("notes").update({ name }).eq("id", id);
    }
};

export const moveNote = async (id: string, path: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        path = path.startsWith("/") ? path : "/" + path;
        path = path.endsWith("/") ? path : path + "/";
        note.path = path;
        await supabase.from("notes").update({ path }).eq("id", id);
    }
};

export const deleteNote = async (id: string) => {
    notes = notes.filter((note) => note.id !== id);
    await supabase.from("notes").delete().eq("id", id);
};

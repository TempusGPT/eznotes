import type { Database } from "./core/types";
import { supabase } from "./core/supabase";

export type Note = Omit<Database["public"]["Tables"]["notes"]["Row"], "owner">;

let value = $state<Note[]>([]);

supabase.auth.onAuthStateChange((_, session) => {
    if (!session) {
        return;
    }

    supabase
        .from("notes")
        .select("id, path, name, content")
        .eq("owner", session.user.id)
        .order("path, name")
        .then((res) => (value = res.data ?? []));
});

export const notes = {
    find(id: string) {
        return value.find((note) => note.id === id);
    },

    search(query: string) {
        return value.filter((note) => note.name.toLowerCase().includes(query.toLowerCase()));
    },

    notesOnPath(path: string) {
        return value.filter((note) => note.path === path);
    },

    foldersOnPath(path: string) {
        return new Set(
            value
                .filter((note) => note.path !== path && note.path.startsWith(path))
                .map((note) => note.path.replace(path, "").split("/")[0]),
        );
    },

    create(path: string, name: string) {
        const note: Note = {
            id: window.crypto.randomUUID(),
            path,
            name,
            content: import.meta.env.VITE_EMPTY_CONTENT,
        };

        value.push(note);
        value.sort((a, b) => a.path.localeCompare(b.path) || a.name.localeCompare(b.name));
        supabase.from("notes").insert(note).then();
        return note.id;
    },

    delete(id: string) {
        value = value.filter((note) => note.id !== id);
        supabase.from("notes").delete().eq("id", id).then();
    },

    editPath(id: string, path: string) {
        path = path.startsWith("/") ? path : "/" + path;
        path = path.endsWith("/") ? path : path + "/";

        value.filter((note) => note.id === id).forEach((note) => (note.path = path));
        value.sort((a, b) => a.path.localeCompare(b.path) || a.name.localeCompare(b.name));
        supabase.from("notes").update({ path }).eq("id", id).then();
    },

    editName(id: string, name: string) {
        value.filter((note) => note.id === id).forEach((note) => (note.name = name));
        value.sort((a, b) => a.path.localeCompare(b.path) || a.name.localeCompare(b.name));
        supabase.from("notes").update({ name }).eq("id", id).then();
    },

    editContent(id: string, content: string) {
        value.filter((note) => note.id === id).forEach((note) => (note.content = content));
        supabase.from("notes").update({ content }).eq("id", id).then();
    },
} as const;

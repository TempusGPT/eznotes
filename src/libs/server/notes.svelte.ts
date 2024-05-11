import type { Database } from "./types";
import { supabase } from "./supabase";

export type Note = Omit<Database["public"]["Tables"]["notes"]["Row"], "owner">;

let notesState = $state<Note[]>([]);

supabase.auth.getSession().then((res) => {
    const user = res.data.session?.user;

    supabase
        .schema("public")
        .from("notes")
        .select("*")
        .eq("owner", user?.id ?? "")
        .then((res) => (notesState = res.data ?? []));
});

export const notes = {
    search(query: string) {
        return notesState.filter((note) => note.name.toLowerCase().includes(query.toLowerCase()));
    },

    findById(id: string) {
        return notesState.find((note) => note.id === id);
    },

    findByPath(path: string) {
        return notesState.filter((note) => note.path === path);
    },

    findFoldersByPath(path: string): Set<string> {
        return new Set(
            notesState
                .filter((note) => note.path !== path && note.path.startsWith(path))
                .map((note) => note.path.replace(path, "").split("/")[0]),
        );
    },

    async create(path: string, name: string) {
        const { data } = await supabase
            .from("notes")
            .insert({ path, name })
            .select("*")
            .maybeSingle();
        if (!data) {
            return;
        }

        notesState.push(data);
        return data.id;
    },

    async delete(id: string) {
        notesState = notesState.filter((note) => note.id !== id);
        await supabase.from("notes").delete().eq("id", id);
    },

    async editPath(id: string, path: string) {
        const note = notesState.find((note) => note.id === id);
        if (note) {
            path = path.startsWith("/") ? path : "/" + path;
            path = path.endsWith("/") ? path : path + "/";
            note.path = path;
            await supabase.from("notes").update({ path }).eq("id", id);
        }
    },

    async editName(id: string, name: string) {
        const note = notesState.find((note) => note.id === id);
        if (note) {
            note.name = name;
            await supabase.from("notes").update({ name }).eq("id", id);
        }
    },

    async editContent(id: string, content: string) {
        const note = notesState.find((note) => note.id === id);
        if (note) {
            note.content = content;
            await supabase.from("notes").update({ content }).eq("id", id);
        }
    },
} as const;

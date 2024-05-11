import type { Database } from "./core/types";
import { supabase } from "./core/supabase";

export type Note = Omit<Database["public"]["Tables"]["notes"]["Row"], "owner">;

let originalNotes = $state<Note[]>([]);
const sortedNotes = $derived(
    originalNotes.toSorted((a, b) => a.path.localeCompare(b.path) || a.name.localeCompare(b.name)),
);

supabase.auth.onAuthStateChange((_, session) => {
    if (!session) {
        return;
    }

    supabase
        .from("notes")
        .select("id, path, name, content")
        .eq("owner", session.user.id)
        .then((res) => (originalNotes = res.data ?? []));
});

export const notes = {
    find(id: string) {
        return sortedNotes.find((note) => note.id === id);
    },

    search(query: string) {
        return sortedNotes.filter((note) => note.name.toLowerCase().includes(query.toLowerCase()));
    },

    notesOnPath(path: string) {
        return sortedNotes.filter((note) => note.path === path);
    },

    foldersOnPath(path: string) {
        return new Set(
            sortedNotes
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

        originalNotes.push(note);
        supabase.from("notes").insert(note).then();
        return note.id;
    },

    delete(id: string) {
        originalNotes = originalNotes.filter((note) => note.id !== id);
        supabase.from("notes").delete().eq("id", id).then();
    },

    editPath(id: string, path: string) {
        path = path.startsWith("/") ? path : "/" + path;
        path = path.endsWith("/") ? path : path + "/";
        originalNotes.filter((note) => note.id === id).forEach((note) => (note.path = path));
        supabase.from("notes").update({ path }).eq("id", id).then();
    },

    editName(id: string, name: string) {
        originalNotes.filter((note) => note.id === id).forEach((note) => (note.name = name));
        supabase.from("notes").update({ name }).eq("id", id).then();
    },

    editContent(id: string, content: string) {
        originalNotes.filter((note) => note.id === id).forEach((note) => (note.content = content));
        supabase.from("notes").update({ content }).eq("id", id).then();
    },
} as const;

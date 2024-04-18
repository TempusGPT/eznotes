export type Note = { path: string; content: string };

export const NOTES: readonly Note[] = [
    { path: "/Some Note", content: "# Some Note\n\nThis is some note." },
    { path: "/Other Note", content: "# Another Note\n\nThis is another note." },
    {
        path: "/Folder/Note inside a folder",
        content: "# Note in Folder\n\nThis is a note in a folder.",
    },
    {
        path: "/Folder/Other Folder/Note in Nested Folder",
        content: "# Note in Nested Folder\n\nThis is a note in a nested folder.",
    },
];

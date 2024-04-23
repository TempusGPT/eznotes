export type Note = {
    id: string;
    path: string;
    content: string;
};

export const notes: Note[] = [
    {
        id: "foo",
        path: "/Some Note",
        content: "# Some Note\n\nThis is some note.",
    },
    {
        id: "bar",
        path: "/Other Note",
        content: "# Another Note\n\nThis is another note.",
    },
    {
        id: "baz",
        path: "/Folder/Note inside a folder",
        content: "# Note in Folder\n\nThis is a note in a folder.",
    },
    {
        id: "qux",
        path: "/Folder/Other Folder/Note in Nested Folder",
        content: "# Note in Nested Folder\n\nThis is a note in a nested folder.",
    },
];

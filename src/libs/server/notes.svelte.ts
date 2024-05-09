export type Note = {
    id: string;
    path: string;
    name: string;
    content: string;
};

const EMPTY_CONTENT =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph"\
    ,"version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1\
    }}';

let notes = $state<Note[]>(JSON.parse(localStorage.getItem("notes") ?? "[]"));

export const emptyNote = (): Note => {
    return { id: "", path: "", name: "", content: EMPTY_CONTENT };
};

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

export const createNote = (path: string, name: string) => {
    const id = window.crypto.randomUUID();
    notes.push({ id, path, name, content: EMPTY_CONTENT });
    localStorage.setItem("notes", JSON.stringify(notes));
    return id;
};

export const editNote = (id: string, content: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        note.content = content;
        localStorage.setItem("notes", JSON.stringify(notes));
    }
};

export const renameNote = (id: string, name: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        note.name = name;
        localStorage.setItem("notes", JSON.stringify(notes));
    }
};

export const moveNote = (id: string, path: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
        path = path.startsWith("/") ? path : "/" + path;
        path = path.endsWith("/") ? path : path + "/";
        note.path = path;
        localStorage.setItem("notes", JSON.stringify(notes));
    }
};

export const deleteNote = (id: string) => {
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
};

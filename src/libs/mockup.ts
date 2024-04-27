export type Note = {
    id: string;
    path: string;
    name: string;
    content: string;
};

export const notes: Note[] = [
    {
        id: "some-note",
        path: "/",
        name: "Some Note",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Some Note","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is some note.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
    },
    {
        id: "other-note",
        path: "/",
        name: "Other Note",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Other Note","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is other note.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
    },
    {
        id: "note-in-folder",
        path: "/Folder/",
        name: "Note in Folder",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Note in Folder","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is note in folder.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
    },
    {
        id: "note-in-nested-folder",
        path: "/Folder/Nested Folder/",
        name: "Note in Nested Folder",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Note in Nested Folder","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is note in nested folder.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
    },
];

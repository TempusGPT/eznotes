export type Note = {
    id: string;
    path: string;
    name: string;
    content: string;
    lastEdit: number;
};

export const notes: Note[] = [
    {
        id: "75ea8172-3e1b-471a-ab67-b83956a665db",
        path: "/",
        name: "Some Note",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Some Note","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is some note.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        lastEdit: 1,
    },
    {
        id: "4fe7ee5f-637d-41fa-be93-13ad7d5d2748",
        path: "/",
        name: "Other Note",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Other Note","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is other note.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        lastEdit: 2,
    },
    {
        id: "763d4fc2-56e5-4b2b-b74e-26f1a0f582e8",
        path: "/Folder/",
        name: "Note in Folder",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Note in Folder","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is note in folder.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        lastEdit: 0,
    },
    {
        id: "b5c88063-30bd-46b5-81eb-2521424fb91d",
        path: "/Folder/Nested Folder/",
        name: "Note in Nested Folder",
        content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Note in Nested Folder","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is note in nested folder.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        lastEdit: 3,
    },
];

export const EMPTY_CONTENT = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

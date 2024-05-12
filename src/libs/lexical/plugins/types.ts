import type { Klass, LexicalEditor, LexicalNode } from "lexical";

export type Plugin = {
    nodes: Klass<LexicalNode>[];
    register: (editor: LexicalEditor) => (() => void)[];
};

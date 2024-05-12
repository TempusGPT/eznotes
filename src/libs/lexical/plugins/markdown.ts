import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown";
import type { Plugin } from "./types";

export const markdownPlugin = (): Plugin => ({
    nodes: [],
    register(editor) {
        return [registerMarkdownShortcuts(editor, TRANSFORMERS)];
    },
});

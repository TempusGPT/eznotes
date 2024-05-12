import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import type { Plugin } from "./types";

export const historyPlugin = (delay: number): Plugin => ({
    nodes: [],
    register(editor) {
        return [registerHistory(editor, createEmptyHistoryState(), delay)];
    },
});

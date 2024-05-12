import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import type { Plugin } from "./types";

export const historyPlugin = (delay: number, state = createEmptyHistoryState()): Plugin => ({
    nodes: [],
    register(editor) {
        return [registerHistory(editor, state, delay)];
    },
});

import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import type { Plugin } from "./types";

export const historyPlugin: Plugin = {
    nodes: [],
    register: (editor) => registerHistory(editor, createEmptyHistoryState(), 1000),
};

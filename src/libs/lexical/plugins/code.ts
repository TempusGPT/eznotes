import { CodeHighlightNode, CodeNode, registerCodeHighlighting } from "@lexical/code";
import type { Plugin } from "./types";

export const codePlugin: Plugin = {
    nodes: [CodeHighlightNode, CodeNode],
    register: registerCodeHighlighting,
};

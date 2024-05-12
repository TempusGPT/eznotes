import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import type { Plugin } from "./types";

export const richTextPlugin: Plugin = {
    nodes: [HeadingNode, QuoteNode],
    register: registerRichText,
};

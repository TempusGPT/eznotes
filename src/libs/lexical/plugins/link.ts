import { AutoLinkNode, LinkNode } from "@lexical/link";
import type { Plugin } from "./types";

export const linkPlugin: Plugin = {
    nodes: [AutoLinkNode, LinkNode],
};

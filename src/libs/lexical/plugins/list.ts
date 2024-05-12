import { ListNode, ListItemNode } from "@lexical/list";
import type { Plugin } from "./types";

export const listPlugin: Plugin = {
    nodes: [ListNode, ListItemNode],
};

import { LinkNode } from "@lexical/link";
import type { Plugin } from "./types";

export const linkPlugin = (): Plugin => ({
    nodes: [LinkNode],
    register() {
        return [];
    },
});

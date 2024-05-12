import {
    ListNode,
    ListItemNode,
    $handleListInsertParagraph as handleListInsertParagraph,
} from "@lexical/list";

import { COMMAND_PRIORITY_LOW, INSERT_PARAGRAPH_COMMAND } from "lexical";
import type { Plugin } from "./types";

export const listPlugin = (): Plugin => ({
    nodes: [ListNode, ListItemNode],

    register(editor) {
        return [
            editor.registerCommand(
                INSERT_PARAGRAPH_COMMAND,
                handleListInsertParagraph,
                COMMAND_PRIORITY_LOW,
            ),
        ];
    },
});

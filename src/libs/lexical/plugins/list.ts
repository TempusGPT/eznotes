import {
    ListNode,
    ListItemNode,
    INSERT_ORDERED_LIST_COMMAND,
    insertList,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    removeList,
    $handleListInsertParagraph as handleListInsertParagraph,
} from "@lexical/list";

import { COMMAND_PRIORITY_LOW, INSERT_PARAGRAPH_COMMAND } from "lexical";
import type { Plugin } from "./types";

export const listPlugin = (): Plugin => ({
    nodes: [ListNode, ListItemNode],

    register(editor) {
        return [
            editor.registerCommand(
                INSERT_ORDERED_LIST_COMMAND,
                () => {
                    insertList(editor, "number");
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),

            editor.registerCommand(
                INSERT_UNORDERED_LIST_COMMAND,
                () => {
                    insertList(editor, "bullet");
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),

            editor.registerCommand(
                REMOVE_LIST_COMMAND,
                () => {
                    removeList(editor);
                    return true;
                },
                COMMAND_PRIORITY_LOW,
            ),

            editor.registerCommand(
                INSERT_PARAGRAPH_COMMAND,
                () => {
                    const hasHandledInsertParagraph = handleListInsertParagraph();

                    if (hasHandledInsertParagraph) {
                        return true;
                    }

                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        ];
    },
});

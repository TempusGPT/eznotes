import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, type CommandListener } from "lexical";
import { LinkNode } from "@lexical/link";
import type { Plugin } from "./types";

export const linkPlugin = (): Plugin => ({
    nodes: [LinkNode],
    register(editor) {
        return [editor.registerCommand(CLICK_COMMAND, handleLinkClick, COMMAND_PRIORITY_LOW)];
    },
});

const handleLinkClick: CommandListener<MouseEvent> = ({ target }) => {
    if (target instanceof HTMLElement && target.parentElement instanceof HTMLAnchorElement) {
        window.location.href = target.parentElement.href;
        return true;
    }

    return false;
};

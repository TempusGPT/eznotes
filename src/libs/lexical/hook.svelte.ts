import { mergeRegister } from "@lexical/utils";
import { createEditor } from "lexical";
import type { Plugin } from "./plugins/types";

type PluginWithRegister = Plugin & { register: NonNullable<Plugin["register"]> };

const hasRegister = (plugin: Plugin): plugin is PluginWithRegister => {
    return plugin.register !== undefined;
};

export const useLexical = (...plugins: Plugin[]) => {
    const editor = createEditor({
        nodes: plugins.flatMap((plugin) => plugin.nodes),
    });

    $effect(() => {
        return mergeRegister(
            ...plugins.filter(hasRegister).map(({ register }) => register(editor)),
        );
    });

    return Object.assign(
        (element: HTMLElement) => {
            editor.setRootElement(element);
        },
        {
            content() {
                const state = editor.getEditorState();
                return JSON.stringify(state);
            },

            setContent(content: string) {
                const state = editor.parseEditorState(content);
                editor.setEditorState(state);
            },
        },
    );
};

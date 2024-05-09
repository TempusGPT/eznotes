<script lang="ts" context="module">
    export type EditorProps = {
        content?: string;
    };
</script>

<script lang="ts">
    import { createEditor } from "lexical";
    import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
    import { CodeHighlightNode, CodeNode, registerCodeHighlighting } from "@lexical/code";
    import { ListNode, ListItemNode } from "@lexical/list";
    import { LinkNode } from "@lexical/link";
    import { createEmptyHistoryState, registerHistory } from "@lexical/history";
    import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown";
    import { mergeRegister } from "@lexical/utils";

    import { location } from "~/libs/router";
    import { notes } from "~/libs/mockup";

    let { content }: EditorProps = $props();
    let element: HTMLElement;

    const editor = createEditor({
        nodes: [
            HeadingNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            ListNode,
            ListItemNode,
            LinkNode,
        ],
    });

    $effect(() => {
        editor.setRootElement(element);

        return mergeRegister(
            registerRichText(editor),
            registerCodeHighlighting(editor),
            registerMarkdownShortcuts(editor, TRANSFORMERS),
            registerHistory(editor, createEmptyHistoryState(), 1000),
        );
    });

    $effect(() => {
        if (content) {
            const state = editor.parseEditorState(content);
            editor.setEditorState(state);
        }
    });

    const saveNote = () => {
        const state = JSON.stringify(editor.getEditorState());
        notes
            .filter((note) => note.id === location.params.id)
            .forEach((note) => (note.content = state));
    };
</script>

<article bind:this={element} onblur={saveNote} contenteditable />

<style>
    article {
        height: var(--height);
        padding: var(--spacing-v) var(--spacing-h);
        margin: 0;
        overflow: scroll;
    }

    article:focus {
        outline: none;
    }
</style>

<script lang="ts" context="module">
    import { type Note } from "~/libs/mockup.svelte";

    export type EditorProps = {
        note: Note;
        editable: boolean;
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

    let { note, editable }: EditorProps = $props();
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
        const state = editor.parseEditorState(note.content);
        editor.setEditorState(state);
    });

    const saveNote = () => {
        const state = JSON.stringify(editor.getEditorState());
        note.content = state;
        note.lastEdit = Date.now();
    };
</script>

<article bind:this={element} onblur={saveNote} contenteditable={editable} />

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

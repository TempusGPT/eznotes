<script lang="ts" context="module">
    import { type Note, notes } from "@libs/server";

    export type EditorProps = {
        note?: Note;
        readonly?: boolean;
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

    let { note, readonly = false }: EditorProps = $props();
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
        if (note) {
            const state = editor.parseEditorState(note.content);
            editor.setEditorState(state);
        }
    });

    const saveNote = () => {
        if (note) {
            const state = JSON.stringify(editor.getEditorState());
            notes.editContent(note.id, state);
        }
    };
</script>

<article>
    {#if note}
        <h1>{note.name}</h1>
    {/if}
    <div bind:this={element} onblur={saveNote} contenteditable={!readonly} />
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        padding: var(--spacing-v) var(--spacing-h);
        height: var(--height);
        margin: 0;
        overflow: scroll;
    }

    div {
        flex: 1;
        outline: none;
    }
</style>

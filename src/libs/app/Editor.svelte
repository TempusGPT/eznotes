<script lang="ts" context="module">
    import { editNote, type Note } from "~/libs/server/notes.svelte";

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
        editNote(note.id, state);
    };
</script>

<article>
    <h1>{note.name}</h1>
    <div bind:this={element} onblur={saveNote} contenteditable={editable} />
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

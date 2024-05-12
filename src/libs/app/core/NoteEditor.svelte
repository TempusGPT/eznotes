<script lang="ts" context="module">
    import { type Note, notes } from "@libs/server";

    export type NoteEditorProps = {
        note?: Note;
        readonly?: boolean;
    };
</script>

<script lang="ts">
    import {
        codePlugin,
        useLexical,
        historyPlugin,
        linkPlugin,
        listPlugin,
        markdownPlugin,
        richTextPlugin,
    } from "@libs/lexical";

    let { note, readonly = false }: NoteEditorProps = $props();

    const lexical = useLexical(
        codePlugin,
        historyPlugin,
        linkPlugin,
        listPlugin,
        markdownPlugin,
        richTextPlugin,
    );

    $effect(() => {
        if (note) {
            lexical.setContent(note.content);
        }
    });

    const saveNote = () => {
        if (note) {
            notes.editContent(note.id, lexical.content());
        }
    };
</script>

<article>
    {#if note}
        <h1>{note.name}</h1>
    {/if}
    <div use:lexical contenteditable={!readonly} onblur={saveNote} />
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

<script lang="ts" context="module">
    import type { Note } from "~/libs/server/notes.svelte";

    export type ExplorerLayoutProps = {
        note?: Note;
        explorerOnMobile?: boolean;
    };
</script>

<script lang="ts">
    import { device } from "~/libs/media-query";
    import Explorer from "./NoteExplorer.svelte";
    import Editor from "./NoteEditor.svelte";

    let { note, explorerOnMobile = false }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if explorerOnMobile}
            <Explorer />
        {:else if note}
            <Editor {note} />
        {:else}
            <Editor readonly />
        {/if}
    {:else}
        <div class="grid">
            <Explorer />
            {#if note}
                <Editor {note} />
            {:else}
                <Editor readonly />
            {/if}
        </div>
    {/if}
</main>

<style>
    :root {
        --spacing-h: calc(var(--pico-block-spacing-horizontal) * 2);
        --spacing-v: calc(var(--pico-block-spacing-vertical) * 2);
        --height: calc(100dvh - var(--spacing-v));
    }

    .grid {
        grid-template-columns: 18em 1fr;
    }
</style>

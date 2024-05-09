<script lang="ts" context="module">
    import type { Note } from "~/libs/server/notes.svelte";

    export type ExplorerLayoutProps = {
        note: Note;
        editable?: boolean;
        explorerOnMobile?: boolean;
    };
</script>

<script lang="ts">
    import { device } from "~/libs/media-query";
    import Explorer from "./Explorer.svelte";
    import Editor from "./Editor.svelte";

    let { note, editable = false, explorerOnMobile = false }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if explorerOnMobile}
            <Explorer />
        {:else}
            <Editor {note} {editable} />
        {/if}
    {:else}
        <div class="grid">
            <Explorer />
            <Editor {note} {editable} />
        </div>
    {/if}
</main>

<style>
    :root {
        --spacing-h: calc(var(--pico-block-spacing-horizontal) * 2);
        --spacing-v: calc(var(--pico-block-spacing-vertical) * 2);
        --height: calc(100vh - var(--spacing-v));
    }

    .grid {
        grid-template-columns: 18em 1fr;
    }
</style>

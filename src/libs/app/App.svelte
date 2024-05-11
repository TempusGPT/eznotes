<script lang="ts" context="module">
    import type { Note } from "@libs/server";

    export type Mobile = "explorer" | "editor";

    export type AppProps = {
        mobile: Mobile;
        note?: Note;
    };
</script>

<script lang="ts">
    import { device } from "@libs/media-query";
    import NoteExplorer from "./core/NoteExplorer.svelte";
    import NoteEditor from "./core/NoteEditor.svelte";

    let { mobile, note }: AppProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if mobile === "explorer"}
            <NoteExplorer highlight={note} />
        {:else if mobile === "editor"}
            {@render noteEditor()}
        {/if}
    {:else}
        <div class="grid">
            <NoteExplorer highlight={note} />
            {@render noteEditor()}
        </div>
    {/if}
</main>

{#snippet noteEditor()}
    {#if note}
        <NoteEditor {note} />
    {:else}
        <NoteEditor readonly />
    {/if}
{/snippet}

<style>
    :root {
        --spacing-h: calc(var(--pico-block-spacing-horizontal) * 2);
        --spacing-v: calc(var(--pico-block-spacing-vertical) * 2);
        --height: calc(100dvh - var(--spacing-v));
    }

    .grid {
        grid-template-columns: 18rem 1fr;
    }
</style>

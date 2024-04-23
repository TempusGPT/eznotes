<script lang="ts" context="module">
    export type ExplorerLayoutProps = {
        content?: string;
        explorerOnMobile?: boolean;
    };
</script>

<script lang="ts">
    import { device } from "~/libs/media-query";
    import Explorer from "./Explorer.svelte";
    import Editor from "./Editor.svelte";

    let { content, explorerOnMobile = false }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if explorerOnMobile}
            <Explorer />
        {:else}
            <Editor {content} />
        {/if}
    {:else}
        <div class="grid">
            <Explorer />
            <Editor {content} />
        </div>
    {/if}
</main>

<style>
    :root {
        --spacing-h: calc(var(--pico-block-spacing-horizontal) * 2);
        --spacing-v: calc(var(--pico-block-spacing-vertical) * 2);
    }

    .grid {
        grid-template-columns: 18em 1fr;
    }
</style>

<script lang="ts" context="module">
    import type { Snippet } from "svelte";

    export type ExplorerLayoutProps = {
        explorerOnMobile?: boolean;
        children: Snippet;
    };
</script>

<script lang="ts">
    import { device } from "~/libs/media-query";
    import Explorer from "./Explorer.svelte";
    import Editor from "./Editor.svelte";

    let { explorerOnMobile = false, children }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if explorerOnMobile}
            <Explorer />
        {:else}
            <Editor></Editor>
        {/if}
    {:else}
        <div class="grid">
            <Explorer />
            <Editor></Editor>
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

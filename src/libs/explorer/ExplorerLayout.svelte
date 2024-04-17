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

    let { explorerOnMobile = false, children }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if device.mobile}
        {#if explorerOnMobile}
            <Explorer />
        {:else}
            <article>
                {@render children()}
            </article>
        {/if}
    {:else}
        <div class="grid">
            <Explorer />
            <article>
                {@render children()}
            </article>
        </div>
    {/if}
</main>

<style lang="scss">
    article {
        height: calc(100vh - var(--pico-block-spacing-vertical) * 2);
        margin: 0;
        padding: calc(var(--pico-block-spacing-vertical) * 2)
            calc(var(--pico-block-spacing-horizontal) * 2);
    }

    .grid {
        grid-template-columns: 18em 1fr;
    }
</style>

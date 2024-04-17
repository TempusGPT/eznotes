<script lang="ts" context="module">
    import type { Snippet } from "svelte";

    export type ExplorerLayoutProps = {
        explorerOnMobile?: boolean;
        children: Snippet;
    };
</script>

<script lang="ts">
    import { responsive } from "~/libs/responsive.svelte";
    import Explorer from "./Explorer.svelte";

    let { explorerOnMobile = false, children }: ExplorerLayoutProps = $props();
</script>

<main class="container-fluid">
    {#if responsive.isMobile}
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
    .grid {
        grid-template-columns: 18em 1fr;
    }
</style>

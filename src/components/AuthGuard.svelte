<script lang="ts" context="module">
    import type { Snippet } from "svelte";
    import { navigate } from "~/libs/router";
    import { auth } from "~/libs/server";

    export type AuthGuardProps = {
        children: Snippet;
    };
</script>

<script lang="ts">
    let { children }: AuthGuardProps = $props();
</script>

{#if auth.ready}
    {#if auth.user}
        {@render children()}
    {:else}
        {navigate("/signin", { replace: true })}
    {/if}
{/if}

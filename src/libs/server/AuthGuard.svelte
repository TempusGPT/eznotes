<script lang="ts" context="module">
    import type { Snippet } from "svelte";
    import type { Session } from "@supabase/supabase-js";
    import { navigate } from "~/libs/router";
    import { supabase } from "./supabase";

    export type AuthGuardProps = {
        children: Snippet;
    };

    let ready = $state(false);
    let session = $state<Session | null>(null);

    supabase.auth.getSession().then((value) => {
        session = value.data.session;
        ready = true;
    });

    supabase.auth.onAuthStateChange((_, value) => {
        session = value;
    });
</script>

<script lang="ts">
    let { children }: AuthGuardProps = $props();
</script>

{#if ready}
    {#if session}
        {@render children()}
    {:else}
        {navigate("/signin", { replace: true })}
    {/if}
{/if}

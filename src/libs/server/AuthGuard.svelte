<script lang="ts" context="module">
    import type { Snippet } from "svelte";
    import type { User } from "@supabase/supabase-js";
    import { navigate } from "@libs/router";
    import { supabase } from "./supabase";

    export type AuthGuardProps = {
        children: Snippet;
    };

    let ready = $state(false);
    let user = $state<User>();

    supabase.auth.onAuthStateChange((_, session) => {
        user = session?.user;
        ready = true;
    }); 
</script>

<script lang="ts">
    let { children }: AuthGuardProps = $props();
</script>

{#if ready}
    {#if user}
        {@render children()}
    {:else}
        {navigate("/signin", { replace: true })}
    {/if}
{/if}

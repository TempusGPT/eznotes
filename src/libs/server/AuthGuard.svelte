<script lang="ts" context="module">
    import type { Snippet } from "svelte";
    import type { UserResponse } from "@supabase/supabase-js";
    import { navigate } from "~/libs/router";
    import { supabase } from "./supabase";

    export type AuthGuardProps = {
        children: Snippet;
    };

    let response = $state<UserResponse>();
    supabase.auth.getUser().then((value) => (response = value));
</script>

<script lang="ts">
    let { children }: AuthGuardProps = $props();

    $effect(() => {
        if (response?.error) {
            navigate("/signin");
        }
    });
</script>

{#if response}
    {@render children()}
{/if}

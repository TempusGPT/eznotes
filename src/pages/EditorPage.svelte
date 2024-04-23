<script lang="ts">
    import { notes } from "~/libs/mockup";
    import { location } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import ErrorPage from "~/pages/ErrorPage.svelte";

    const note = $derived(notes.find((note) => note.id === location.params.id));
</script>

{#if note}
    <ExplorerLayout content={note.content} />
{:else}
    <ErrorPage />
{/if}

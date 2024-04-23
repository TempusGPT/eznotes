<script lang="ts">
    import { NOTES } from "~/libs/mockup";
    import { location } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import ErrorPage from "~/pages/ErrorPage.svelte";

    let note = $state(NOTES.find((note) => note.path === location.path.replace("/notes", "")));
</script>

{#if note}
    <ExplorerLayout>asdf</ExplorerLayout>
{:else}
    <ErrorPage />
{/if}

<script lang="ts">
    import { notes } from "~/libs/mockup";
    import { location } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import ErrorPage from "~/pages/ErrorPage.svelte";

    let note = $state(notes.find((note) => note.path === location.path.replace("/notes", "")));
</script>

{#if note}
    <ExplorerLayout>asdf</ExplorerLayout>
{:else}
    <ErrorPage />
{/if}

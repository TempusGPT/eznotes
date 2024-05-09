<script lang="ts">
    import { emptyNote, findNote } from "~/libs/server/notes.svelte";
    import { location } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";

    const note = $derived(findNote(location.params.id));
    const notFound = emptyNote();
</script>

{#if note}
    <ExplorerLayout {note} editable />
{:else}
    <ExplorerLayout note={notFound} />
{/if}

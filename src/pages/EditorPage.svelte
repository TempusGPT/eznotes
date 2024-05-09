<script lang="ts">
    import { notes } from "~/libs/mockup.svelte";
    import { location } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";

    const note = $derived(notes.find((note) => note.id === location.params.id));
</script>

{#if note}
    <ExplorerLayout {note} editable />
{/if}

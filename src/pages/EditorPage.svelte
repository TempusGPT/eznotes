<script lang="ts">
    import { emptyNote, findNote } from "~/libs/server/notes.svelte";
    import { location } from "~/libs/router";
    import AppLayout from "~/libs/app/AppLayout.svelte";

    const note = $derived(findNote(location.params.id));
    const notFound = emptyNote();
</script>

{#if note}
    <AppLayout {note} editable />
{:else}
    <AppLayout note={notFound} />
{/if}

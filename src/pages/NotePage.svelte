<script lang="ts">
    import { findNote } from "~/libs/server/notes.svelte";
    import { location } from "~/libs/router";
    import NoteLayout from "~/libs/note/NoteLayout.svelte";
    import AuthGuard from "~/libs/server/AuthGuard.svelte";

    const note = $derived(findNote(location.params.id));
</script>

<AuthGuard>
    <NoteLayout {note} />
</AuthGuard>

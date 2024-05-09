<script lang="ts">
    import { findNote } from "~/libs/server/notes.svelte";
    import { location } from "~/libs/router";
    import NoteLayout from "~/libs/note/NoteLayout.svelte";

    const note = $derived(findNote(location.params.id));
</script>

<NoteLayout {note} />

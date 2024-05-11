<script lang="ts">
    import { notes } from "~/libs/server";
    import { location } from "~/libs/router";
    import NoteLayout from "~/components/NoteLayout.svelte";
    import AuthGuard from "~/components/AuthGuard.svelte";

    const note = $derived(notes.findById(location.params.id));
</script>

<AuthGuard>
    <NoteLayout {note} />
</AuthGuard>

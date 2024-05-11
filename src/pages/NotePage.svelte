<script lang="ts">
    import { notes } from "@libs/server";
    import { location } from "@libs/router";
    import { AuthGuard } from "@libs/server";
    import { NoteLayout } from "@libs/note";

    const note = $derived(notes.find(location.params.id));
</script>

<AuthGuard>
    <NoteLayout {note} />
</AuthGuard>

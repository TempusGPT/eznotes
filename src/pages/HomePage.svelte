<script lang="ts">
    import { AuthGuard } from "@libs/server";
    import { NoteLayout } from "@libs/note";
</script>

<AuthGuard>
    <NoteLayout explorerOnMobile />
</AuthGuard>

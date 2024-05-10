<script lang="ts">
    import NoteLayout from "~/libs/note/NoteLayout.svelte";
    import AuthGuard from "~/libs/server/AuthGuard.svelte";
</script>

<AuthGuard>
    <NoteLayout explorerOnMobile />
</AuthGuard>

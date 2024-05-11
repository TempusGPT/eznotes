<script lang="ts">
    import NoteLayout from "~/components/NoteLayout.svelte";
    import AuthGuard from "~/components/AuthGuard.svelte";
</script>

<AuthGuard>
    <NoteLayout explorerOnMobile />
</AuthGuard>

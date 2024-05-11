<script lang="ts">
    import { notes } from "@libs/server";
    import { location } from "@libs/router";
    import { AuthGuard } from "@libs/server";
    import { App } from "@libs/app";

    const note = $derived(notes.find(location.params.id));
</script>

<AuthGuard>
    <App mobile="editor" {note} />
</AuthGuard>

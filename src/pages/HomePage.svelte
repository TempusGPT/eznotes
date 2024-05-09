<script lang="ts">
    import AppLayout from "~/libs/app/AppLayout.svelte";
    import { emptyNote } from "~/libs/server/notes.svelte";

    const welcome = emptyNote();
</script>

<AppLayout note={welcome} explorerOnMobile />

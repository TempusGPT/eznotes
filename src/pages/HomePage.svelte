<script lang="ts">
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import { emptyNote } from "~/libs/server/notes.svelte";

    const welcome = emptyNote();
</script>

<ExplorerLayout note={welcome} explorerOnMobile />

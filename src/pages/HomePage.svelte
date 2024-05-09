<script lang="ts">
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import { EMPTY_CONTENT, type Note } from "~/libs/mockup.svelte";

    const welcome: Note = {
        id: "",
        path: "",
        name: "",
        content: EMPTY_CONTENT,
        lastEdit: 0,
    };
</script>

<ExplorerLayout note={welcome} explorerOnMobile />

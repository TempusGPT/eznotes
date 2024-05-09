<script lang="ts">
    import { notes } from "~/libs/mockup";
    import { location, navigate } from "~/libs/router";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";

    const note = $derived(notes.find((note) => note.id === location.params.id));

    $effect(() => {
        if (location.params.id && !note) {
            navigate("/");
        }
    });
</script>

<ExplorerLayout content={note?.content} />

<script lang="ts">
    import { location } from "svelte-spa-router";
    import { marked } from "marked";
    import DOMPurify from "dompurify";

    import { NOTES } from "~/libs/mockup";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";

    let path = $state("");
    const note = $derived(
        NOTES.find((note) => note.path === decodeURI(path.replace("/notes", "")))
    );

    location.subscribe((value) => (path = value));
</script>

{#if note}
    <ExplorerLayout>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html DOMPurify.sanitize(marked(note.content) as string)}
    </ExplorerLayout>
{:else}
    Not Found
{/if}

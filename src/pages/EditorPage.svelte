<script lang="ts">
    import { location } from "svelte-spa-router";
    import { marked } from "marked";
    import DOMPurify from "dompurify";

    import { NOTES, type Note } from "~/libs/mockup";
    import ExplorerLayout from "~/libs/explorer/ExplorerLayout.svelte";
    import ErrorPage from "~/pages/ErrorPage.svelte";

    let note = $state<Note>();
    location.subscribe((value) => {
        note = NOTES.find((note) => note.path === decodeURI(value.replace("/notes", "")));
    });
</script>

{#if note}
    <ExplorerLayout>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html DOMPurify.sanitize(marked(note.content) as string)}
    </ExplorerLayout>
{:else}
    <ErrorPage />
{/if}

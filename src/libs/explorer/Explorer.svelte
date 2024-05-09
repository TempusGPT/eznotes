<script lang="ts" context="module">
    const STORAGE_KEY = "explorer-path";
</script>

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes, type Note } from "~/libs/mockup.svelte";
    import NoteMenuModal from "./NoteMenuModal.svelte";
    import NewNoteModal from "./NewNoteModal.svelte";

    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    const currentFolder = $derived(currentPath.split("/").at(-2));

    $effect(() => {
        sessionStorage.setItem(STORAGE_KEY, currentPath);
    });

    const visibleFolders = $derived(
        new Set(
            notes
                .filter(({ path }) => path !== currentPath && path.startsWith(currentPath))
                .map(({ path }) => path.replace(currentPath, "").split("/")[0]),
        ),
    );
    const visibleNotes = $derived(notes.filter(({ path }) => path === currentPath));

    const openFolder = (folder: string) => {
        currentPath += folder + "/";
    };

    const closeFolder = () => {
        const path = currentPath.split("/");
        path.splice(-2, 1);
        currentPath = path.join("/");
    };

    let searchQuery = $state("");
    let searchResult = $derived(
        notes.filter((note) => note.name.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    let noteMenuModal: NoteMenuModal;
    let newNoteModal: NewNoteModal;
</script>

<article class="explorer">
    <input type="search" placeholder="Search" bind:value={searchQuery} />

    {#if searchQuery === ""}
        {#if currentFolder}
            <button class="item" onclick={closeFolder}>❌ {currentFolder}</button>
        {/if}

        {#each visibleFolders as folder}
            <button class="item" onclick={() => openFolder(folder)}>📁 {folder}</button>
        {/each}

        {#each visibleNotes as note}
            {@render noteItem(note)}
        {/each}

        <button class="item" onclick={() => newNoteModal.open()}>✅ New Note</button>
    {:else}
        {#each searchResult as note}
            {@render noteItem(note)}
        {/each}
    {/if}
</article>

<NoteMenuModal {notes} bind:this={noteMenuModal} />
<NewNoteModal {notes} path={currentPath} bind:this={newNoteModal} />

{#snippet noteItem(note: Note)}
    <div class="grid">
        <button class="item" onclick={() => navigate("/notes/" + note.id)}>📝 {note.name}</button>
        <button class="item" onclick={() => noteMenuModal.open(note)}>⋮</button>
    </div>
{/snippet}

<style>
    .explorer {
        height: var(--height);
        margin: 0;
        overflow: scroll;
    }

    .item {
        width: 100%;
        padding: 0.25em;
        border: none;
        background-color: transparent;
        text-align: left;
    }

    .item:focus {
        box-shadow: none;
    }

    .grid {
        grid-template-columns: 1fr auto;
        gap: 0;
    }
</style>

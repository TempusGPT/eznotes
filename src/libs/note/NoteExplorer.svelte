<script lang="ts" context="module">
    const STORAGE_KEY = "explorer-path";
</script>

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { foldersOf, notesOf, searchNotes, type Note } from "~/libs/server/notes.svelte";
    import MenuModal from "./MenuModal.svelte";
    import CreateModal from "./CreateModal.svelte";

    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    $effect(() => sessionStorage.setItem(STORAGE_KEY, currentPath));

    const currentFolder = $derived(currentPath.split("/").at(-2));
    const visibleFolders = $derived(foldersOf(currentPath));
    const visibleNotes = $derived(notesOf(currentPath));

    const openFolder = (folder: string) => {
        currentPath += folder + "/";
    };

    const closeFolder = () => {
        const path = currentPath.split("/");
        path.splice(-2, 1);
        currentPath = path.join("/");
    };

    let searchQuery = $state("");
    let searchResult = $derived(searchNotes(searchQuery));
    let menuModal: MenuModal;
    let createModal: CreateModal;
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

        <button class="item" onclick={() => createModal.open()}>✅ New Note</button>
    {:else}
        {#each searchResult as note}
            {@render noteItem(note)}
        {/each}
    {/if}
</article>

<MenuModal bind:this={menuModal} />
<CreateModal path={currentPath} bind:this={createModal} />

{#snippet noteItem(note: Note)}
    <div class="grid">
        <button class="item" onclick={() => navigate("/notes/" + note.id)}>📝 {note.name}</button>
        <button class="item" onclick={() => menuModal.open(note)}>⋮</button>
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
        box-shadow: none;
    }

    .grid {
        grid-template-columns: 1fr auto;
        gap: 0;
    }
</style>

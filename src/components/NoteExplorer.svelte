<script lang="ts" context="module">
    const STORAGE_KEY = "explorer-path";
    const EN_SPACE = " ";
</script>

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes, type Note } from "~/libs/server";
    import MenuModal from "~/components/MenuModal.svelte";
    import CreateModal from "~/components/CreateModal.svelte";

    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    $effect(() => sessionStorage.setItem(STORAGE_KEY, currentPath));

    const currentFolder = $derived(currentPath.split("/").at(-2));
    const visibleFolders = $derived(notes.findFoldersByPath(currentPath));
    const visibleNotes = $derived(notes.findByPath(currentPath));

    const openFolder = (folder: string) => {
        currentPath += folder + "/";
    };

    const closeFolder = () => {
        const path = currentPath.split("/");
        path.splice(-2, 1);
        currentPath = path.join("/");
    };

    let searchQuery = $state("");
    let searchResult = $derived(notes.search(searchQuery));
    let menuModal: MenuModal;
    let createModal: CreateModal;
</script>

<article class="explorer">
    <input type="search" placeholder="Search" bind:value={searchQuery} />

    {#if searchQuery === ""}
        {#if currentFolder}
            <button class="item" onclick={closeFolder}>❌{EN_SPACE}{currentFolder}</button>
        {/if}

        {#each visibleFolders as folder}
            <button class="item" onclick={() => openFolder(folder)}>📁{EN_SPACE}{folder}</button>
        {/each}

        {#each visibleNotes as note}
            {@render noteItem(note)}
        {/each}

        <button class="item" onclick={() => createModal.open()}>✅{EN_SPACE}New Note</button>
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
        <button class="item" onclick={() => navigate("/notes/" + note.id)}>
            📝{EN_SPACE}{note.name}
        </button>
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

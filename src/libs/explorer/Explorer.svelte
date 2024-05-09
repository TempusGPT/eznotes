<script lang="ts" context="module">
    const STORAGE_KEY = "explorer-path";
</script>

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes as notesOrigin, type Note } from "~/libs/mockup";
    import NoteMenuModal from "./NoteMenuModal.svelte";
    import NewNoteModal from "./NewNoteModal.svelte";

    let notes = $state(notesOrigin);
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

<div class="explorer">
    <article>
        <button class="item" onclick={() => newNoteModal.open()}>New Note</button>
        <button class="item" onclick={() => navigate("/settings")}>Settings</button>
    </article>

    <article class="notes">
        <input type="search" placeholder="Search" bind:value={searchQuery} />

        {#if searchQuery === ""}
            {#if currentFolder}
                {@render folderItem("❌", currentFolder, closeFolder)}
            {/if}

            {#each visibleFolders as folder}
                {@render folderItem("📁", folder, () => (currentPath += folder + "/"))}
            {/each}

            {#each visibleNotes as note}
                {@render noteItem(note)}
            {/each}
        {:else}
            {#each searchResult as note}
                {@render noteItem(note)}
            {/each}
        {/if}
    </article>
</div>

<NoteMenuModal {notes} bind:this={noteMenuModal} />
<NewNoteModal {notes} path={currentPath} bind:this={newNoteModal} />

{#snippet folderItem(emoji: string, name: string, onClick: () => void)}
    <button class="item" onclick={onClick}>{emoji} {name}</button>
{/snippet}

{#snippet noteItem(note: Note)}
    <div class="grid">
        <button class="item" onclick={() => navigate("/notes/" + note.id)}>📝 {note.name}</button>
        <button class="item" onclick={() => noteMenuModal.open(note)}>⋮</button>
    </div>
{/snippet}

<style>
    .explorer {
        height: calc(100vh - var(--pico-block-spacing-horizontal) * 2);
        display: flex;
        flex-direction: column;
    }

    .notes {
        margin: 0;
        flex-grow: 1;
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

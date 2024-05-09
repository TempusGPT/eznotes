<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes as notesOrigin } from "~/libs/mockup";
    import NoteMenuModal from "./NoteMenuModal.svelte";
    import NewNoteModal from "./NewNoteModal.svelte";

    const STORAGE_KEY = "explorer-path";
    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    $effect(() => sessionStorage.setItem(STORAGE_KEY, currentPath));

    let notes = $state(notesOrigin);

    const visibleFolders = $derived(
        new Set(
            notes
                .filter(({ path }) => path !== currentPath && path.startsWith(currentPath))
                .map(({ path }) => path.replace(currentPath, "").split("/")[0]),
        ),
    );

    const visibleNotes = $derived(notes.filter(({ path }) => path === currentPath));

    const openSettings = () => navigate("/settings");
    const openFolder = (path: string) => (currentPath += path + "/");
    const openNote = (id: string) => navigate("/notes/" + id);

    const closeFolder = () => {
        const path = currentPath.split("/");
        path.splice(-2, 1);
        currentPath = path.join("/");
    };

    let noteMenuModal: NoteMenuModal;
    let newNoteModal: NewNoteModal;

    let searchQuery = $state("");
    let searchResult = $derived(
        notes.filter((note) => note.name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
</script>

<div class="explorer">
    <article>
        <button class="item" onclick={() => newNoteModal.open()}>New Note</button>
        <button class="item" onclick={openSettings}>Settings</button>
    </article>

    <article class="notes">
        <input type="search" placeholder="Search" bind:value={searchQuery} />

        {#if searchQuery === ""}
            {#if currentPath !== "/"}
                <button class="item" onclick={closeFolder}>
                    ❌ {currentPath.split("/").at(-2)}
                </button>
            {/if}

            {#each visibleFolders as folder}
                <button class="item" onclick={() => openFolder(folder)}>📁 {folder}</button>
            {/each}

            {#each visibleNotes as note}
                <div class="grid">
                    <button class="item" onclick={() => openNote(note.id)}>📝 {note.name}</button>
                    <button class="item" onclick={() => noteMenuModal.open(note)}>⋮</button>
                </div>
            {/each}
        {:else}
            {#each searchResult as note}
                <div class="grid">
                    <button class="item" onclick={() => openNote(note.id)}>📝 {note.name}</button>
                    <button class="item" onclick={() => noteMenuModal.open(note)}>⋮</button>
                </div>
            {/each}
        {/if}
    </article>
</div>

<NoteMenuModal {notes} bind:this={noteMenuModal} />
<NewNoteModal {notes} path={currentPath} bind:this={newNoteModal} />

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

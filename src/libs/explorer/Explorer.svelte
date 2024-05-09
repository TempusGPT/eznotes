<script lang="ts">
    import { navigate } from "~/libs/router";
    import { EMPTY_CONTENT, notes as notesOrigin, type Note } from "~/libs/mockup";
    import Modal from "./Modal.svelte";

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

    let currentModifyingNote = $state<Note | null>(null);
    let radioSelection = $state("rename");
    let inputValue = $state("");
    const inputDisabled = $derived(radioSelection === "delete");

    $effect(() => {
        if (!currentModifyingNote) {
            return;
        }

        if (radioSelection === "rename") {
            inputValue = currentModifyingNote.name;
        } else if (radioSelection === "move") {
            inputValue = currentModifyingNote.path;
        } else if (radioSelection === "delete") {
            inputValue = "";
        }
    });

    const modifyNote = (note: Note) => (currentModifyingNote = note);
    const handleCancel = () => (currentModifyingNote = null);

    const handleModify = () => {
        if (!currentModifyingNote) {
            return;
        }

        if (radioSelection === "rename") {
            currentModifyingNote.name = inputValue;
        } else if (radioSelection === "move") {
            let path = inputValue;
            path = path.startsWith("/") ? path : "/" + path;
            path = path.endsWith("/") ? path : path + "/";
            currentModifyingNote.path = path;
        } else if (radioSelection === "delete") {
            notes.splice(notes.indexOf(currentModifyingNote), 1);
        }

        currentModifyingNote = null;
    };

    let newNoteModal = $state(false);
    const INPUT_PLACEHOLDER = "Untitled";

    const openNewNoteModal = () => {
        inputValue = "";
        newNoteModal = true;
    };

    const newNote = () => {
        const id = window.crypto.randomUUID();
        const name = inputValue === "" ? INPUT_PLACEHOLDER : inputValue;
        notes.push({ id, name, path: currentPath, content: EMPTY_CONTENT });

        newNoteModal = false;
        navigate("/notes/" + id);
    };

    let searchQuery = $state("");
    let searchResult = $state<Note[]>([]);

    $effect(() => {
        if (searchQuery === "") {
            return;
        }

        const query = searchQuery.toLowerCase();
        searchResult = notes.filter(({ name }) => name.toLowerCase().includes(query));
    });
</script>

<div class="explorer">
    <article>
        <button class="item" onclick={openNewNoteModal}>New Note</button>
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
                    <button class="item" onclick={() => modifyNote(note)}>⋮</button>
                </div>
            {/each}
        {:else}
            {#each searchResult as note}
                <div class="grid">
                    <button class="item" onclick={() => openNote(note.id)}>📝 {note.name}</button>
                    <button class="item" onclick={() => modifyNote(note)}>⋮</button>
                </div>
            {/each}
        {/if}
    </article>
</div>

{#if newNoteModal}
    <Modal title="New Note" onCancel={() => (newNoteModal = false)} onSubmit={newNote}>
        <label>
            <div>Note name</div>
            <input placeholder={INPUT_PLACEHOLDER} bind:value={inputValue} />
        </label>
    </Modal>
{/if}

{#if currentModifyingNote}
    <Modal title={currentModifyingNote.name} onCancel={handleCancel} onSubmit={handleModify}>
        <fieldset>
            <input id="rename" value="rename" type="radio" bind:group={radioSelection} />
            <label for="rename">Rename</label>

            <input id="move" value="move" type="radio" bind:group={radioSelection} />
            <label for="move">Move</label>

            <input id="delete" value="delete" type="radio" bind:group={radioSelection} />
            <label for="delete">Delete</label>
        </fieldset>
        <input disabled={inputDisabled} bind:value={inputValue} />
    </Modal>
{/if}

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

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes, type Note } from "~/libs/mockup";

    const STORAGE_KEY = "explorer-path";
    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    $effect(() => sessionStorage.setItem(STORAGE_KEY, currentPath));

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
    const modifyNote = (id: string) =>
        (currentModifyingNote = notes.find((note) => note.id === id) ?? null);
    let radioSelection = $state("rename");
</script>

<div class="explorer">
    <article>
        <button class="item" onclick={openSettings}>Settings</button>
    </article>

    <article class="notes">
        {#if currentPath !== "/"}
            <button class="item" onclick={closeFolder}>❌ {currentPath.split("/").at(-2)}</button>
        {/if}

        {#each visibleFolders as folder}
            <button class="item" onclick={() => openFolder(folder)}>📁 {folder}</button>
        {/each}

        {#each visibleNotes as note}
            <div class="grid">
                <button class="item" onclick={() => openNote(note.id)}>📝 {note.name}</button>
                <button class="item" onclick={() => modifyNote(note.id)}>⋮</button>
            </div>
        {/each}
    </article>
</div>

{#if currentModifyingNote}
    <dialog open>
        <article>
            <h2>{currentModifyingNote.name}</h2>

            <fieldset>
                <input id="rename" value="rename" type="radio" bind:group={radioSelection} />
                <label for="rename">Rename</label>

                <input id="move" value="move" type="radio" bind:group={radioSelection} />
                <label for="move">Move</label>

                <input id="delete" value="delete" type="radio" bind:group={radioSelection} />
                <label for="delete">Delete</label>
            </fieldset>

            <input />

            <footer>
                <button class="secondary">Cancel</button>
                <button>Modify</button>
            </footer>
        </article>
    </dialog>
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
</style>

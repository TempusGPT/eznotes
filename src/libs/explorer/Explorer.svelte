<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes } from "~/libs/mockup";

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
</script>

<div class="explorer">
    <article>
        <button onclick={openSettings}>Settings</button>
    </article>

    <article class="notes">
        {#if currentPath !== "/"}
            <button onclick={closeFolder}>❌ {currentPath.split("/").at(-2)}</button>
        {/if}

        {#each visibleFolders as folder}
            <button onclick={() => openFolder(folder)}>📁 {folder}</button>
        {/each}

        {#each visibleNotes as note}
            <button onclick={() => openNote(note.id)}>📝 {note.name}</button>
        {/each}
    </article>
</div>

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

    button {
        width: 100%;
        padding: 0.25em;
        border: none;
        background-color: transparent;
        text-align: left;
    }

    button:focus {
        box-shadow: none;
    }
</style>

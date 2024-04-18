<script lang="ts" context="module">
    const MOCKUP = [
        { id: 0, path: "/Some Note" },
        { id: 1, path: "/Other Note" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
        { id: 2, path: "/Folder/Note in Folder" },
    ] as const;
</script>

<script lang="ts">
    import { push } from "svelte-spa-router";

    const handleClick = (id: number) => () => {
        push(`/notes/${id}`);
    };
</script>

<div class="explorer">
    <article>
        <button>Settings</button>
        <button>Trash</button>
    </article>

    <article class="notes">
        {#each MOCKUP as { id, path }}
            <button onclick={handleClick(id)}>{id}: {path}</button>
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
        padding: 0.25em 0;
        border: none;
        background-color: transparent;
        text-align: left;
    }
</style>

<script lang="ts" context="module">
    import { NOTES } from "../mockup";

    let currentPath = $state("/");
    let visiblePaths = $derived([
        ...new Set(
            NOTES.filter(({ path }) => path.startsWith(currentPath)).map(
                ({ path }) => path.replace(currentPath, "").split("/")[0]
            )
        ),
    ]);
</script>

<script lang="ts">
    import { push } from "svelte-spa-router";

    const openSettings = () => {
        push("/settings");
    };

    const openPath = (path: string) => {
        const note = NOTES.find((note) => note.path === currentPath + path);

        if (note) {
            push("/notes" + note.path);
        } else {
            currentPath += path + "/";
        }
    };
</script>

<div class="explorer">
    <article>
        <button onclick={openSettings}>Settings</button>
    </article>

    <article class="notes">
        {#each visiblePaths as path}
            <button onclick={() => openPath(path)}>{path}</button>
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

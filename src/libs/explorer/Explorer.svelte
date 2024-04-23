<script lang="ts">
    import { navigate } from "~/libs/router";
    import { notes } from "~/libs/mockup";

    const STORAGE_KEY = "explorer-path";
    let currentPath = $state(sessionStorage.getItem(STORAGE_KEY) ?? "/");
    $effect(() => sessionStorage.setItem(STORAGE_KEY, currentPath));

    let visiblePaths = $derived([
        ...new Set(
            notes
                .filter(({ path }) => path.startsWith(currentPath))
                .map(({ path }) => path.replace(currentPath, "").split("/")[0])
        ),
    ]);

    const openSettings = () => {
        navigate("/settings");
    };

    const pushPath = (path: string) => {
        const note = notes.find((note) => note.path === currentPath + path);

        if (note) {
            navigate("/notes/" + note.id);
        } else {
            currentPath += path + "/";
        }
    };

    const popPath = () => {
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
            {@const path = currentPath.split("/")}
            <button onclick={popPath}>{"<"} {path.at(-2)}</button>
        {/if}

        {#each visiblePaths as path}
            <button onclick={() => pushPath(path)}>{path}</button>
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

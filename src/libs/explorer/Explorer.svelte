<script lang="ts" context="module">
    const MOCKUP = [
        { id: 0, path: "/Some Note" },
        { id: 1, path: "/Other Note" },
        { id: 2, path: "/Folder/Note in Folder" },
    ] as const;
</script>

<script lang="ts">
    import { push } from "svelte-spa-router";

    const handleClick = (id: number) => () => {
        push(`/notes/${id}`);
    };
</script>

<div>
    {#each MOCKUP as { id, path }}
        <button class="list" onclick={handleClick(id)}>{id}: {path}</button>
    {/each}
</div>

<style lang="scss">
    .list {
        width: 100%;
        text-align: left;
        padding: 0.25em 0;
        background-color: transparent;
        border: none;
    }
</style>

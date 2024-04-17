<script lang="ts" context="module">
    const MOCKUP = [
        { id: 0, path: "/Some Note" },
        { id: 1, path: "/Other Note" },
        { id: 2, path: "/Folder/Note in Folder" },
    ] as const;
</script>

<ul>
    {#each MOCKUP as { id, path }}
        <li>{id}: {path}</li>
    {/each}
</ul>

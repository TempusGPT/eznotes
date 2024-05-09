<script lang="ts" context="module">
    export type NewNoteModalProps = {
        path: string;
    };

    const PLACEHOLDER = "Untitled";
</script>

<script lang="ts">
    import { navigate } from "~/libs/router";
    import { createNote } from "~/libs/server/notes.svelte";

    let { path }: NewNoteModalProps = $props();
    let isOpened = $state(false);
    let inputValue = $state("");

    const create = () => {
        const name = inputValue === "" ? PLACEHOLDER : inputValue;
        const id = createNote(name, path);
        isOpened = false;
        navigate("/notes/" + id);
    };

    export const open = () => {
        inputValue = "";
        isOpened = true;
    };

    export const close = () => {
        isOpened = false;
    };
</script>

{#if isOpened}
    <dialog open>
        <article>
            <h2>New Note</h2>
            <label>
                <div>Name</div>
                <input placeholder={PLACEHOLDER} bind:value={inputValue} />
            </label>

            <footer>
                <button class="secondary" onclick={close}>Cancel</button>
                <button onclick={create}>Create</button>
            </footer>
        </article>
    </dialog>
{/if}

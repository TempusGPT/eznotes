<script lang="ts" context="module">
    export type NewNoteModalProps = {
        notes: Note[];
        path: string;
    };

    const PLACEHOLDER = "Untitled";
</script>

<script lang="ts">
    import { EMPTY_CONTENT, type Note } from "~/libs/mockup";
    import { navigate } from "~/libs/router";

    let { notes, path }: NewNoteModalProps = $props();
    let isOpened = $state(false);
    let inputValue = $state("");

    const create = () => {
        const id = window.crypto.randomUUID();
        const name = inputValue === "" ? PLACEHOLDER : inputValue;
        notes.push({ id, name, path, content: EMPTY_CONTENT, lastEdit: Date.now() });
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

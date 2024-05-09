<script lang="ts">
    import { deleteNote, moveNote, renameNote, type Note } from "~/libs/server/notes.svelte";

    let current = $state<Note>();
    let selection = $state("rename");
    let inputValue = $state("");

    $effect(() => {
        if (!current) {
            return;
        }

        if (selection === "rename") {
            inputValue = current.name;
        } else if (selection === "move") {
            inputValue = current.path;
        } else if (selection === "delete") {
            inputValue = "";
        }
    });

    const modify = () => {
        if (!current) {
            return;
        }

        if (selection === "rename") {
            renameNote(current.id, inputValue);
        } else if (selection === "move") {
            moveNote(current.id, inputValue);
        } else if (selection === "delete") {
            deleteNote(current.id);
        }

        current = undefined;
    };

    export const open = (note: Note) => (current = note);
    export const close = () => (current = undefined);
</script>

{#if current}
    <dialog open>
        <article>
            <h2>{current.name}</h2>
            <fieldset>
                <input id="rename" value="rename" type="radio" bind:group={selection} />
                <label for="rename">Rename</label>

                <input id="move" value="move" type="radio" bind:group={selection} />
                <label for="move">Move</label>

                <input id="delete" value="delete" type="radio" bind:group={selection} />
                <label for="delete">Delete</label>
            </fieldset>
            <input disabled={selection === "delete"} bind:value={inputValue} />

            <footer>
                <button class="secondary" onclick={close}>Cancel</button>
                <button onclick={modify}>Modify</button>
            </footer>
        </article>
    </dialog>
{/if}

<script lang="ts" context="module">
    export type NoteMenuModalProps = {
        notes: Note[];
    };
</script>

<script lang="ts">
    import type { Note } from "~/libs/mockup";

    let { notes }: NoteMenuModalProps = $props();
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
            current.name = inputValue;
        } else if (selection === "move") {
            let path = inputValue;
            path = path.startsWith("/") ? path : "/" + path;
            path = path.endsWith("/") ? path : path + "/";
            current.path = path;
        } else if (selection === "delete") {
            notes.splice(notes.indexOf(current), 1);
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

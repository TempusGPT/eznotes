<script lang="ts" context="module">
    import type { Snippet } from "svelte";

    export type ModalProps = {
        title: string;
        onCancel: () => void;
        onSubmit: () => void;
        children: Snippet;
    };
</script>

<script lang="ts">
    let { title, onCancel, onSubmit, children }: ModalProps = $props();
</script>

<dialog open>
    <article>
        <h2>{title}</h2>
        {@render children()}

        <footer>
            <button class="secondary" onclick={onCancel}>Cancel</button>
            <button onclick={onSubmit}>Submit</button>
        </footer>
    </article>
</dialog>

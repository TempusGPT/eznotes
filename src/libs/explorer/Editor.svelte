<script lang="ts">
    import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
    import { createEmptyHistoryState, registerHistory } from "@lexical/history";
    import { mergeRegister } from "@lexical/utils";
    import { createEditor } from "lexical";
    import prepopulatedRichText from "./prepopulatedRichText";

    let element: HTMLElement;

    $effect(() => {
        const editor = createEditor({ nodes: [HeadingNode, QuoteNode] });
        editor.setRootElement(element);
        editor.update(prepopulatedRichText, { tag: "history-merge" });

        return mergeRegister(
            registerRichText(editor),
            registerHistory(editor, createEmptyHistoryState(), 300)
        );
    });
</script>

<article bind:this={element} contenteditable></article>

<style>
    article {
        height: calc(100vh - var(--spacing-v));
        padding: var(--spacing-v) var(--spacing-h);
        margin: 0;
        overflow: scroll;
    }

    article:focus {
        outline: none;
    }
</style>

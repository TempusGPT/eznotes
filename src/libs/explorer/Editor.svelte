<script lang="ts">
    import { QuoteNode, registerRichText } from "@lexical/rich-text";
    import { HeadingNode } from "@lexical/rich-text";
    import { createEditor } from "lexical";
    import prepopulatedRichText from "./prepopulatedRichText";

    let element: HTMLElement;

    $effect(() => {
        const initialConfig = {
            namespace: "Vanilla JS Demo",
            // Register nodes specific for @lexical/rich-text
            nodes: [HeadingNode, QuoteNode],
            onError: (error: Error) => {
                throw error;
            },
            theme: {
                // Adding styling to Quote node, see styles.css
                quote: "PlaygroundEditorTheme__quote",
            },
        };

        const editor = createEditor(initialConfig);
        editor.setRootElement(element);
        registerRichText(editor);
        editor.update(prepopulatedRichText, { tag: "history-merge" });
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

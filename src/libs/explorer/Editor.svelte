<script lang="ts">
    import { createEditor } from "lexical";
    import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
    import { CodeHighlightNode, CodeNode, registerCodeHighlighting } from "@lexical/code";
    import { ListNode, ListItemNode } from "@lexical/list";
    import { LinkNode } from "@lexical/link";
    import { createEmptyHistoryState, registerHistory } from "@lexical/history";
    import { TRANSFORMERS, registerMarkdownShortcuts } from "@lexical/markdown";
    import { mergeRegister } from "@lexical/utils";

    let element: HTMLElement;

    $effect(() => {
        const editor = createEditor({
            nodes: [
                HeadingNode,
                QuoteNode,
                CodeNode,
                CodeHighlightNode,
                ListNode,
                ListItemNode,
                LinkNode,
            ],
        });

        editor.setRootElement(element);

        return mergeRegister(
            registerRichText(editor),
            registerCodeHighlighting(editor),
            registerMarkdownShortcuts(editor, TRANSFORMERS),
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

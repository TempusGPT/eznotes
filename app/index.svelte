<script lang="ts">
    import HomePage from "~/pages/HomePage.svelte";
    import AboutPage from "~/pages/AboutPage.svelte";
    import NotFound from "~/pages/NotFound.svelte";
</script>

{#if location.pathname === "/"}
    <HomePage />
{:else if location.pathname === "/about"}
    <AboutPage />
{:else}
    <NotFound />
{/if}

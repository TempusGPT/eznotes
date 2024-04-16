import { mount } from "svelte";
import Router from "svelte-spa-router";
import HomePage from "~/pages/HomePage.svelte";
import AboutPage from "~/pages/AboutPage.svelte";
import NotFound from "~/pages/NotFound.svelte";

const routes = {
    "/": HomePage,
    "/about": AboutPage,
    "*": NotFound,
};

mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

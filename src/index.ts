import { mount } from "svelte";
import { Router, navigate } from "~/libs/router";

import NotePage from "~/pages/NotePage.svelte";
import ErrorPage from "~/pages/ErrorPage.svelte";
import HomePage from "~/pages/HomePage.svelte";
import LoginPage from "~/pages/LoginPage.svelte";

const routes = {
    "/": HomePage,
    "/notes/:id": NotePage,
    "/login": LoginPage,
    "/*": ErrorPage,
};

if (!window.location.hash) {
    navigate("/", { replace: true });
}

mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

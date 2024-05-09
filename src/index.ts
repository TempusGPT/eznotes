import { mount } from "svelte";
import { Router, navigate } from "~/libs/router";

import EditorPage from "~/pages/EditorPage.svelte";
import ErrorPage from "~/pages/ErrorPage.svelte";
import HomePage from "~/pages/HomePage.svelte";
import LoginPage from "~/pages/LoginPage.svelte";

const routes = {
    "/": HomePage,
    "/notes/:id": EditorPage,
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

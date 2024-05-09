import { mount } from "svelte";
import { Router, navigate } from "~/libs/router";

import HomePage from "~/pages/HomePage.svelte";
import NotePage from "~/pages/NotePage.svelte";
import SignInPage from "~/pages/SignInPage.svelte";
import NotFoundPage from "~/pages/NotFoundPage.svelte";

const routes = {
    "/": HomePage,
    "/notes/:id": NotePage,
    "/signin": SignInPage,
    "/*": NotFoundPage,
};

if (!window.location.hash) {
    navigate("/", { replace: true });
}

mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

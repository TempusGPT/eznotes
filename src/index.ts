import { mount } from "svelte";
import { Router, navigate } from "@libs/router";

import ExplorerPage from "./pages/ExplorerPage.svelte";
import EditorPage from "./pages/EditorPage.svelte";
import SignInPage from "./pages/SignInPage.svelte";
import NotFoundPage from "./pages/NotFoundPage.svelte";

const routes = {
    "/": ExplorerPage,
    "/notes/:id": EditorPage,
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

import { mount } from "svelte";
import Router from "svelte-spa-router";

import Editor from "~/pages/Editor.svelte";
import Explorer from "~/pages/Explorer.svelte";
import Home from "~/pages/Home.svelte";
import NotFound from "~/pages/NotFound.svelte";
import Settings from "~/pages/Settings.svelte";
import SignIn from "~/pages/SignIn.svelte";

const routes = {
    "/": Home,
    "/notes": Explorer, // redirect /signin if not auth
    "/notes/:id": Editor, // redirect /signin if not auth
    "/settings": Settings, // redirect /signin if not auth
    "/signin": SignIn,
    "/*": NotFound,
};

window.location.hash = "/";
mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

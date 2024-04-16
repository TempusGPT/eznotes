import { mount } from "svelte";
import Router from "svelte-spa-router";

import Home from "~/pages/Home.svelte";
import Editor from "~/pages/Editor.svelte";
import Explorer from "~/pages/Explorer.svelte";
import Settings from "~/pages/Settings.svelte";
import SignIn from "~/pages/SignIn.svelte";
import NotFound from "~/pages/NotFound.svelte";

const routes = {
    "/": Home,
    "/notes": Explorer, // redirect /signin if not auth
    "/notes/:id": Editor, // redirect /signin if not auth
    "/settings": Settings, // redirect /signin if not auth
    "/signin": SignIn,
    "/*": NotFound,
};

mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

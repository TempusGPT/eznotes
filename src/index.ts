import { mount } from "svelte";
import Router, { replace } from "svelte-spa-router";

import EditorPage from "~/pages/EditorPage.svelte";
import ErrorPage from "~/pages/ErrorPage.svelte";
import HomePage from "~/pages/HomePage.svelte";
import LoginPage from "~/pages/LoginPage.svelte";
import SettingsPage from "~/pages/SettingsPage.svelte";

const routes = {
    "/": HomePage,
    "/notes/*": EditorPage,
    "/settings": SettingsPage,
    "/login": LoginPage,
    "/*": ErrorPage,
};

if (!window.location.hash) {
    replace("/");
}

mount(Router, {
    target: document.getElementById("root")!,
    props: { routes },
});

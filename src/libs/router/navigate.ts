import { push, replace } from "svelte-spa-router";

export const navigate = (path: string, options = { replace: false }) => {
    if (options.replace) {
        replace(path);
    } else {
        push(path);
    }
};

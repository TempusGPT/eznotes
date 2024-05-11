import { get } from "svelte/store";
import { location as path, querystring as query, params } from "svelte-spa-router";

const toPath = (value: string): string => {
    return decodeURI(value);
};

const toQuery = (value?: string): Record<string, string> => {
    return Object.fromEntries(new URLSearchParams(value));
};

const toParams = (value?: Record<string, string>): Record<string, string> => {
    return value ?? {};
};

let pathValue = $state(toPath(get(path)));
let queryValue = $state(toQuery(get(query)));
let paramsValue = $state(toParams(get(params)));

path.subscribe((value) => (pathValue = toPath(value)));
query.subscribe((value) => (queryValue = toQuery(value)));
params.subscribe((value) => (paramsValue = toParams(value)));

export const location = {
    get path() {
        return pathValue;
    },
    get query() {
        return queryValue;
    },
    get params() {
        return paramsValue;
    },
} as const;

import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Auth = {
    done: boolean;
    user?: User;
};

let ready = $state(false);
let user = $state<User>();

supabase.auth.onAuthStateChange((_, session) => {
    user = session?.user;
    ready = true;
});

export const auth = {
    get ready() {
        return ready;
    },
    get user() {
        return user;
    },
    async signIn() {
        await supabase.auth.signInWithOAuth({ provider: "google" });
    },
    async signOut() {
        await supabase.auth.signOut();
    },
} as const;

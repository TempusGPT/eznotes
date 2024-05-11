import { supabase } from "./core/supabase";

export const auth = {
    async signIn() {
        await supabase.auth.signInWithOAuth({ provider: "google" });
    },
    async signOut() {
        await supabase.auth.signOut();
    },
} as const;

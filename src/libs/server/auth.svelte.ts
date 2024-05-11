import { supabase } from "./core/supabase";

export const auth = {
    async signIn() {
        await supabase.auth.signInWithOAuth({ provider: "google" });
    },

    async signOut() {
        await supabase.auth.signOut();
    },

    async withdraw() {
        const res = await supabase.auth.getUser();
        if (res.data.user) {
            await supabase.auth.admin.deleteUser(res.data.user.id);
        }
    },
} as const;

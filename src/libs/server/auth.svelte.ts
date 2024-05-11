import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Auth = {
    done: boolean;
    user?: User;
};

export const auth = $state<Auth>({ done: false });

supabase.auth.getSession().then((res) => {
    auth.done = true;
    auth.user = res.data.session?.user;
});

supabase.auth.onAuthStateChange((_, session) => {
    auth.user = session?.user;
});

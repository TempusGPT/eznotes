interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_KEY: string;
    readonly VITE_EMPTY_CONTENT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

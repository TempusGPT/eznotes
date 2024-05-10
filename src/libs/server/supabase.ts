import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://ysndqbsbnnlzrjzaodsr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbmRxYnNibm5senJqemFvZHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjI2OTcsImV4cCI6MjAzMDc5ODY5N30.yEvekjoln19Tzryq0Fop70amATB8c_eob65n1o__4iE",
);

<script lang="ts">
    import { AuthGuard } from "@libs/server";
    import { App } from "@libs/app";
</script>

<AuthGuard>
    <App mobile="explorer" />
</AuthGuard>

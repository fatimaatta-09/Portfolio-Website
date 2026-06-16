// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Force-enable the nitro deploy build with the Cloudflare Pages preset. Without this, a
  // self-hosted build outside the Lovable sandbox skips nitro ("No Lovable context detected
  // — skipping nitro deploy plugin"), so no deploy output (dist/_worker.js, _routes.json,
  // wrangler config) is produced and the Cloudflare Pages deploy fails.
  nitro: { preset: "cloudflare-pages" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

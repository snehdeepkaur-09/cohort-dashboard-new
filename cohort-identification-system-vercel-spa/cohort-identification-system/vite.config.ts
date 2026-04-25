// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static SPA build for Vercel.
//  - cloudflare: false        → no Cloudflare Worker bundle
//  - tanstackStart.spa        → emit a single client-rendered SPA shell so
//    every route (/, /admin, /cohorts, /pipeline, /risk-analysis) is served
//    statically and hydrated on the client.
//  - prerender.outputPath     → write the shell as index.html so Vercel
//    serves it as the SPA fallback.
//
// Build output goes to dist/client (configured as Vercel outputDirectory in
// vercel.json). dist/server can be ignored — it's only generated as part of
// the TanStack build pipeline and is not used at runtime.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
      },
    },
    pages: [],
  },
});

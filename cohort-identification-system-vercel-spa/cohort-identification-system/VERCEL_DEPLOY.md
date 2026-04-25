# Deploying to Vercel (Static SPA)

This project is configured as a **fully static SPA** — no SSR, no server runtime.
TanStack Router handles all routing on the client.

## 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

## 2. Import on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel reads `vercel.json` automatically. Settings (already configured):
   - **Framework Preset:** `Vite`
   - **Build Command:** `bun run build` (or `npm run build`)
   - **Output Directory:** `dist/client`
   - **Install Command:** `bun install` (or `npm install`)
4. Click **Deploy**.

The included `vercel.json` also adds an SPA rewrite so deep links like
`/admin`, `/cohorts`, `/pipeline`, and `/risk-analysis` all serve `index.html`
and let the client router take over.

## 3. How the static build works
- `vite.config.ts` enables `tanstackStart.spa` and disables the Cloudflare adapter.
- The build emits a single client-rendered shell at `dist/client/index.html`.
- `scripts/postbuild-spa.mjs` removes the temporary `dist/server/` directory
  (TanStack always writes one during the build pipeline; it isn't used at runtime).
- No environment variables, no edge functions, no server runtime required.

## 4. Routes (all client-side)
- `/` — Dashboard
- `/admin`
- `/cohorts`
- `/pipeline`
- `/risk-analysis`

## 5. Run locally
```bash
bun install
bun run dev          # dev server with HMR
bun run build        # produces dist/client/
bun run preview      # serve the production build
```

## 6. Notes
- `wrangler.jsonc` is leftover Cloudflare config and is unused on Vercel —
  safe to keep or delete.
- This demo uses mock data only, so no env vars or backend are needed.

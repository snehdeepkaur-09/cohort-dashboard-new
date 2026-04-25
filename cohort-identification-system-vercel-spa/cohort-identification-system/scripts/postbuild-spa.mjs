// Post-build step for static SPA deploys (e.g. Vercel).
//
// TanStack Start's SPA mode emits the client shell as `dist/client/_shell.html`.
// Vercel's static hosting expects an `index.html` at the output root, so we:
//   1. Copy `_shell.html` → `index.html` inside `dist/client/`.
//   2. Remove the `dist/server/` directory (no server runtime is used).
import { existsSync, copyFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const clientDir = resolve(distDir, "client");
const serverDir = resolve(distDir, "server");
const shell = resolve(clientDir, "_shell.html");
const indexHtml = resolve(clientDir, "index.html");

if (existsSync(shell)) {
  copyFileSync(shell, indexHtml);
  console.log("[postbuild-spa] Copied dist/client/_shell.html → dist/client/index.html");
} else if (existsSync(indexHtml)) {
  console.log("[postbuild-spa] dist/client/index.html already exists, skipping copy.");
} else {
  console.warn("[postbuild-spa] No _shell.html found in dist/client — SPA shell missing.");
}

if (existsSync(serverDir)) {
  rmSync(serverDir, { recursive: true, force: true });
  console.log("[postbuild-spa] Removed dist/server/ (not used in static SPA deploys).");
}

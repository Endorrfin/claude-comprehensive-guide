import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base ('./') + hash routing makes the built site work locally
// (vite preview) and on GitHub Pages under ANY project sub-path with zero config.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // CHANGED (S12): make the vendor chunk EXPLICIT — only the React runtime
        // (react · react-dom · scheduler) goes into the long-cache react-vendor
        // chunk. Previously every node_modules id was lumped in, so any future
        // dependency would silently join the eager critical path. Now anything else
        // gets Rollup's default (lazy-boundary) chunking.
        manualChunks(id: string) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react-vendor";
          return undefined;
        },
      },
    },
  },
});

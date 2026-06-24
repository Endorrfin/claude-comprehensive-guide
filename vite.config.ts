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
        // CHANGED (S10b): split the React vendor into its own long-cache chunk,
        // separate from the app shell + content. Pairs with the route/sim-level
        // lazy-loading in App.tsx / registry.tsx.
        manualChunks(id: string) {
          if (id.includes("node_modules")) return "react-vendor";
          return undefined;
        },
      },
    },
  },
});

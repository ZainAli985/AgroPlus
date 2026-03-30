// vite.config.js — place in your project root (same level as backend/ and src/)
// Your layout:
//   main-project-folder/
//     backend/          ← Express server
//     src/              ← React source
//     dist/             ← Vite build output (this is what Express serves)
//     vite.config.js    ← this file
//     package.json

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Where React source lives — adjust if your entry is in a subfolder
  root: ".",

  server: {
    port: 5173,
    // Dev proxy: /api → Express on :3000
    // Only active during `npm run dev`, not in production.
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    // Output dist/ at the project root, next to backend/
    // Express looks for it at path.join(__dirname, "..", "dist") from backend/server.js
    outDir: "dist",
    emptyOutDir: true,

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom"))    return "vendor-react-dom";
          if (id.includes("node_modules/react"))        return "vendor-react";
          if (id.includes("node_modules/react-router")) return "vendor-router";
          if (id.includes("node_modules/recharts") ||
              id.includes("node_modules/d3-"))          return "vendor-charts";
          if (id.includes("node_modules"))              return "vendor";
        },
      },
    },
  },
});
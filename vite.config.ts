import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    svgr({
      exportAsDefault: false,
    }),
    react(),
  ],
});

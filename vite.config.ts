/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [svgr(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/shared.scss";`,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests_setup.js",
  },
});

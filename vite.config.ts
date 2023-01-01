/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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

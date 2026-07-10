import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    watch: {
      usePolling: true, // Try this if HMR feels sluggish
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  envDir:'.'
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy API calls during dev to backend at http://localhost:8000
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // Keep the /api prefix so paths like /api/Quiz/... match backend
        // If your backend is mounted at /api, no rewrite is needed
        // rewrite: (path) => path, // no-op
      },
    },
  },
});

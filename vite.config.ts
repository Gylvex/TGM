import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// Plugin to handle SPA routing fallback
const spaFallbackPlugin = (): Plugin => ({
  name: "spa-fallback",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Skip API routes, static files, and other non-HTML requests
      if (
        req.url?.startsWith("/api") ||
        req.url?.includes(".") ||
        req.url?.startsWith("/@") ||
        req.url?.startsWith("/__")
      ) {
        return next();
      }

      // For all other routes, serve index.html to enable client-side routing
      req.url = "/index.html";
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), spaFallbackPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

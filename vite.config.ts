import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// GitHub Pages + custom domain (valora-tech.com): base must stay '/'.
// If you ever publish to https://<user>.github.io/<repo>/, set base: '/<repo>/'.
// See https://vite.dev/guide/static-deploy
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

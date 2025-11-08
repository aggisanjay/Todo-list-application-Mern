import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [
    react(),
      // ✅ required for Tailwind v4
  ],
});

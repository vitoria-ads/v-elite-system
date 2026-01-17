import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/v-elite-system/",
  plugins: [react()],
  build: {
    outDir: "docs", // <--- O TRUQUE TÁ AQUI
  },
});

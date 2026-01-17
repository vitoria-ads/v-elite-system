import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/v-elite-system/", // <--- ISSO AQUI É OBRIGATÓRIO PRA NÃO FICAR TELA PRETA
  build: {
    outDir: "docs", // <--- ISSO AQUI FAZ FUNCIONAR O TRUQUE DA PASTA DOCS
  },
});

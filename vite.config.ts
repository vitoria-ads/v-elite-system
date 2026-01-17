import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/v-elite-system/", // nome EXATO do repositório
  plugins: [react()],
});

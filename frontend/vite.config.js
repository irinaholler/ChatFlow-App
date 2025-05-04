import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // REST
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
      // Socket.IO
      "/socket.io": {
        target: "http://localhost:5001",
        ws: true,
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    },
  },
});

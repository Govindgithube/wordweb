import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api/v1": {
  //       target: "https://long-puce-lamb-ring.cyclic.app/",
  //       secure: false,
  //     },
  //   },
  // },
  server: {
    proxy: {
      "/api/v1": "https://long-puce-lamb-ring.cyclic.app/",
    },
  },
  plugins: [react()],
});

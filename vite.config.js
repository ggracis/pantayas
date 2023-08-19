import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
dns.setDefaultResultOrder("verbatim");
export default defineConfig({
  plugins: [react()],
  server: {
    host: "http://18.231.148.75",
    port: 3000,
  },
});

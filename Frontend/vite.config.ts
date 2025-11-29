<<<<<<< HEAD
// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
>>>>>>> ad8d84d06a4c6a1bbe3c18e1c5d7f8ba2afa0e80

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],

  // ADDING THE 'server' BLOCK WITH THE 'proxy' CONFIGURATION
  server: {
    proxy: {
      //  Define the proxy path prefix. Frontend requests starting with '/api'
    
      "/api": {
        target: "https://wallet-api-55mt.onrender.com", // The actual API server address
        changeOrigin: true, // Necessary for routing virtual hosts
        // Remove '/api' from the path before sending the request to the target.
        //    e.g., '/api/accounts/register/' becomes '/accounts/register/'
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

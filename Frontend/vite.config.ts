import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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
  server: {
    proxy: {
      // any request starting with /api will be proxied
      '/api': {
        target: 'https://wallet-api-55mt.onrender.com',
        changeOrigin: true,
        secure: true, // set to false if you run into self-signed certs
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

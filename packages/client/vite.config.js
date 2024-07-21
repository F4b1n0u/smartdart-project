import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    // https: true, // Not needed for Vite 5+
    // port: 80,
  }, 
  plugins: [
    react(),
    // mkcert(),
    tsconfigPaths()
   ],
   resolve: {
    '@shared': '../packages/shared/src'
   }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  server: {
    // https: true, // Not needed for Vite 5+
    // port: 80,
  }, 
  plugins: [
    react(),
    tsconfigPaths()
   ],
   resolve: {
    '@shared': '../packages/shared/src'
   }
})
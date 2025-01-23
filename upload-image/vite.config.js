import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://web-service-env.eba-mjeeiw4v.us-east-1.elasticbeanstalk.com/3000', // Dirección del servidor backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

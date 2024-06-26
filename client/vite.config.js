import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mini-project-fo4m.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
//http://localhost:3000
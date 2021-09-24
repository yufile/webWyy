import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'views': path.resolve(__dirname, 'src/views'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'commen': path.resolve(__dirname, 'src/commen'),
      'components': path.resolve(__dirname, 'src/components'),
      'network': path.resolve(__dirname, 'src/network'),
      'router': path.resolve(__dirname, 'src/router'),
      'store': path.resolve(__dirname, 'src/store'),
    }
  },
  plugins: [vue()],
  server: {
    host: '0.0.0.0'
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {'/api': {target:'http://localhost:4000', changeOrigin: true}}
  }
})

// 프론트 코드는 baseURL: "/api" <- 백엔드 요청이 됨. 백엔드 도메인이 바뀌든 상관없음.

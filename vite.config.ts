// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import admin from './src/config/connections/URI/admin.ts'

const config =
{
    plugins: [react()],
    server:
    {
        port: admin.port, // Chọn cổng bạn muốn sử dụng
        host: '0.0.0.0', // Cho phép kết nối từ mọi IP trên mạng LAN
    }
}

export default defineConfig(config);
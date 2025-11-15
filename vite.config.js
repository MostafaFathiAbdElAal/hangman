import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    server: {
        host: true,
        allowedHosts: [
            'irredeemable-lovelessly-francesco.ngrok-free.dev',],
        port: 5173
    }
})
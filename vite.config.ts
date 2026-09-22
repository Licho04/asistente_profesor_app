import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg'],
      manifest: {
        name: 'Aula Clara · Asistente del profesor',
        short_name: 'Aula Clara',
        description: 'Organización académica, asistencia, evaluación y materiales del profesor.',
        theme_color: '#17324d',
        background_color: '#f3efe7',
        display: 'standalone',
        lang: 'es-MX',
        icons: [
          {
            src: '/logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/index.html'
      }
    })
  ]
})


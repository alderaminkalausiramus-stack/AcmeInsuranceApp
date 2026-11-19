import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Scenario D: Simulates unoptimized raw camera asset transfer & synchronous decode
function delayedRawEvidencePlugin(): Plugin {
  const handleRawPhoto = (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('/api/raw-evidence-photo.jpg')) {
      const imgPath = path.resolve(__dirname, 'public/damage-photo-raw.jpg')
      // Simulate slow raw uncompressed camera asset transmission (2.2s delay to complete within audit window)
      setTimeout(() => {
        if (fs.existsSync(imgPath)) {
          const data = fs.readFileSync(imgPath)
          res.setHeader('Content-Type', 'image/jpeg')
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
          res.end(data)
        } else {
          res.statusCode = 404
          res.end()
        }
      }, 2200)
    } else {
      next()
    }
  }

  return {
    name: 'delayed-raw-evidence-plugin',
    configureServer(server) {
      server.middlewares.use(handleRawPhoto)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRawPhoto)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), delayedRawEvidencePlugin()],
})

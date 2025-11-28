/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // IMPORTANTE: El basePath se configura desde las variables de entorno
  // Si tu repositorio es "Personal-Profesional", el workflow debe tener:
  // NEXT_PUBLIC_BASE_PATH: '/Personal-Profesional'
  // Si tu repositorio es "username.github.io", debe ser: ''
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true, // Importante para GitHub Pages - genera rutas con /
}

module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Si tu repositorio es username.github.io, usa basePath: ''
  // Si tu repositorio es otro nombre, usa basePath: '/nombre-repositorio'
  // El BASE_PATH se configura desde las variables de entorno en el workflow
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true, // Importante para GitHub Pages
}

module.exports = nextConfig


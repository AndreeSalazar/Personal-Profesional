/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Si tu repositorio es username.github.io, usa basePath: ''
  // Si tu repositorio es otro nombre, usa basePath: '/nombre-repositorio'
  // Por defecto, asumimos que está en la raíz
  basePath: process.env.NODE_ENV === 'production' ? (process.env.BASE_PATH || '') : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? (process.env.BASE_PATH || '') : '',
}

module.exports = nextConfig


import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Professional Node Lab',
  description: 'Advanced visual node-based development environment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}


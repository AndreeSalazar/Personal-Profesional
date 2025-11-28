import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
    <html lang="es" className="h-full">
      <body className="h-full">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}


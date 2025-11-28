'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const paths = [
    { name: t('breadcrumbs.home'), path: '/', key: 'home' },
    { name: t('breadcrumbs.profile'), path: '/profile', key: 'profile' },
    { name: t('breadcrumbs.projects'), path: '/projects', key: 'projects' },
  ]

  const currentPath = paths.find((p) => p.path === pathname) || paths[0]

  if (pathname === '/') return null

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <Link
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home size={14} />
        <span>{t('breadcrumbs.home')}</span>
      </Link>
      <ChevronRight size={14} />
      <span className="text-primary">{currentPath.name}</span>
    </nav>
  )
}


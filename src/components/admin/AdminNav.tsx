'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const links = [
  { href: '/admin', label: 'Главная', exact: true },
  { href: '/admin/products', label: 'Товары' },
  { href: '/admin/categories', label: 'Категории' },
  { href: '/admin/pages', label: 'Страницы' },
  { href: '/admin/analytics', label: 'Аналитика' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-semibold text-zinc-900">Админ-панель</Link>
          <nav className="hidden sm:flex items-center gap-1">
            {links.map(link => {
              const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">
            Сайт ↗
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}

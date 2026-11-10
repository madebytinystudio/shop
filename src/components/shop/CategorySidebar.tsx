'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types/database'

interface CategorySidebarProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategorySidebar({ categories, activeCategory }: CategorySidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-40 shrink-0 pt-1">
      <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-5">Фильтры</p>
      <ul className="space-y-2">
        <li>
          <Link
            href={pathname}
            className={`block text-lg leading-tight transition-colors ${
              !activeCategory ? 'text-zinc-900 font-semibold' : 'text-zinc-300 hover:text-zinc-600'
            }`}
          >
            Все
          </Link>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <Link
              href={`${pathname}?category=${cat.id}`}
              className={`block text-lg leading-tight transition-colors ${
                activeCategory === cat.id ? 'text-zinc-900 font-semibold' : 'text-zinc-300 hover:text-zinc-600'
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

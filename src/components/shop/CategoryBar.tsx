'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types/database'

interface CategoryBarProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategoryBar({ categories, activeCategory }: CategoryBarProps) {
  const pathname = usePathname()

  return (
    <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-none">
      <Link
        href={pathname}
        className={`shrink-0 text-xs tracking-wide uppercase transition-colors ${
          !activeCategory ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
        }`}
      >
        Все
      </Link>
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`${pathname}?category=${cat.id}`}
          className={`shrink-0 text-xs tracking-wide uppercase transition-colors ${
            activeCategory === cat.id ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}

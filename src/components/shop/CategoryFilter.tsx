'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types/database'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <Link
        href={pathname}
        className={`transition-colors ${
          !activeCategory
            ? 'text-zinc-900 font-medium'
            : 'text-zinc-400 hover:text-zinc-900'
        }`}
      >
        Все
      </Link>
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`${pathname}?category=${cat.id}`}
          className={`transition-colors ${
            activeCategory === cat.id
              ? 'text-zinc-900 font-medium'
              : 'text-zinc-400 hover:text-zinc-900'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}

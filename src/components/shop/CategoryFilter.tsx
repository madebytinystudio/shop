'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from '@/types/database'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={pathname}
        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
          !activeCategory
            ? 'bg-zinc-900 text-white border-zinc-900'
            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
        }`}
      >
        Все
      </Link>
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`${pathname}?category=${cat.id}`}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
            activeCategory === cat.id
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}

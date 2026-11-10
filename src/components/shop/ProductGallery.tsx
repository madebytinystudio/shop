'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/types/database'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const [active, setActive] = useState(0)

  if (sorted.length === 0) {
    return (
      <div className="aspect-square bg-zinc-50 flex items-center justify-center text-zinc-200 rounded-sm">
        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden bg-zinc-50 rounded-sm">
        <Image
          src={sorted[active].url}
          alt={sorted[active].alt ?? productName}
          width={800}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-sm border-2 transition-colors ${
                i === active ? 'border-zinc-900' : 'border-transparent'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? productName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

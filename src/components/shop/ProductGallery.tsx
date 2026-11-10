'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/types/database'

function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-zinc-50">
      <svg className="w-12 h-12 text-zinc-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <rect x="3" y="3" width="18" height="18" rx="1"/>
        <path d="M3 16l5-5 4 4 3-3 6 6"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
      </svg>
      <span className="text-[9px] tracking-widest uppercase text-zinc-300">Фото скоро</span>
    </div>
  )
}

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  return error ? (
    <ImagePlaceholder />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      onError={() => setError(true)}
    />
  )
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  if (sorted.length === 0) {
    return (
      <div className="relative h-screen bg-zinc-50">
        <ImagePlaceholder />
      </div>
    )
  }

  return (
    <div>
      {sorted.map((img) => (
        <div key={img.id} className="relative h-screen bg-zinc-50">
          <GalleryImage src={img.url} alt={img.alt ?? productName} />
        </div>
      ))}
    </div>
  )
}

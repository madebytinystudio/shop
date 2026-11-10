'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  sizes?: string
}

export default function ProductImage({ src, alt, sizes }: ProductImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-zinc-50">
        <svg className="w-8 h-8 text-zinc-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
          <rect x="3" y="3" width="18" height="18" rx="1"/>
          <path d="M3 16l5-5 4 4 3-3 6 6"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
        </svg>
        <span className="text-[9px] tracking-widest uppercase text-zinc-300">Фото скоро</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? '(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 400px'}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setError(true)}
    />
  )
}

'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { ProductWithImages, ProductImage } from '@/types/database'
import { uploadProductImage, deleteProductImage, setPrimaryImage } from '@/lib/actions/products'
import { useRouter } from 'next/navigation'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

interface ImageManagerProps {
  product: ProductWithImages
}

export default function ImageManager({ product }: ImageManagerProps) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const sorted = [...(product.product_images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError('Допустимые форматы: JPEG, PNG, WebP, AVIF')
        return
      }
      if (file.size > MAX_SIZE) {
        setError('Максимальный размер файла: 5 МБ')
        return
      }
    }

    setError('')
    startTransition(async () => {
      try {
        for (let i = 0; i < files.length; i++) {
          await uploadProductImage(product.id, files[i], sorted.length === 0 && i === 0)
        }
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки')
      }
      e.target.value = ''
    })
  }

  const handleDelete = (img: ProductImage) => {
    if (!confirm('Удалить фото?')) return
    startTransition(async () => {
      await deleteProductImage(img.id, product.id)
      router.refresh()
    })
  }

  const handleSetPrimary = (img: ProductImage) => {
    startTransition(async () => {
      await setPrimaryImage(img.id, product.id)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
        {sorted.map(img => (
          <div key={img.id} className="relative group aspect-square">
            <div className={`w-full h-full overflow-hidden rounded border-2 ${img.is_primary ? 'border-zinc-900' : 'border-zinc-200'}`}>
              <Image src={img.url} alt="" width={120} height={120} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
              {!img.is_primary && (
                <button
                  onClick={() => handleSetPrimary(img)}
                  disabled={pending}
                  className="bg-white text-zinc-900 text-xs px-2 py-1 rounded"
                  title="Сделать главной"
                >
                  Гл.
                </button>
              )}
              <button
                onClick={() => handleDelete(img)}
                disabled={pending}
                className="bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
            {img.is_primary && (
              <span className="absolute top-1 left-1 bg-zinc-900 text-white text-xs px-1 py-0.5 rounded">Гл.</span>
            )}
          </div>
        ))}

        <label className="aspect-square border-2 border-dashed border-zinc-200 rounded flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors">
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="sr-only" disabled={pending} />
          <span className="text-2xl text-zinc-300">+</span>
          <span className="text-xs text-zinc-400 mt-1">{pending ? 'Загрузка...' : 'Добавить'}</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

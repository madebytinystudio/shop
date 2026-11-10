import Image from 'next/image'
import Link from 'next/link'
import { ProductWithImages } from '@/types/database'
import { formatPrice } from '@/lib/format'

interface ProductCardProps {
  product: ProductWithImages
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.product_images?.find(img => img.is_primary) ?? product.product_images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="aspect-square overflow-hidden bg-zinc-50 rounded-sm mb-3">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-zinc-900 leading-snug mb-1">{product.name}</p>
      <p className="text-sm text-zinc-600">{formatPrice(product.price)}</p>
    </Link>
  )
}

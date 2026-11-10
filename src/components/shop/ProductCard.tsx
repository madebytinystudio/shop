import Link from 'next/link'
import { Product, ProductImage } from '@/types/database'
import { formatPrice } from '@/lib/format'
import ProductImg from './ProductImage'

type ProductWithImage = Product & {
  product_images?: ProductImage[]
}

interface ProductCardProps {
  product: ProductWithImage
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.product_images?.find(i => i.is_primary) ?? product.product_images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square bg-zinc-100 overflow-hidden mb-3">
        {primaryImage ? (
          <ProductImg src={primaryImage.url} alt={primaryImage.alt ?? product.name} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-zinc-50">
            <svg className="w-8 h-8 text-zinc-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
              <rect x="3" y="3" width="18" height="18" rx="1"/>
              <path d="M3 16l5-5 4 4 3-3 6 6"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
            </svg>
            <span className="text-[9px] tracking-widest uppercase text-zinc-300">Фото скоро</span>
          </div>
        )}
      </div>

      {/* Name + price on one row */}
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-zinc-900 leading-tight">
          {product.name}
        </span>
        <span className="text-[10px] sm:text-[11px] tracking-wide text-zinc-500 shrink-0 ml-2">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  )
}

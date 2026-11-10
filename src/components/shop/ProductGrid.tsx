import { Product, ProductImage } from '@/types/database'
import ProductCard from './ProductCard'

type ProductWithImage = Product & {
  product_images?: ProductImage[]
}

interface ProductGridProps {
  products: ProductWithImage[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-xs tracking-widest uppercase text-zinc-300">Товары скоро появятся</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

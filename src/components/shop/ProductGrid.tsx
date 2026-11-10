import { ProductWithImages } from '@/types/database'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: ProductWithImages[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center text-zinc-400">
        <p className="text-lg">Товары скоро появятся</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

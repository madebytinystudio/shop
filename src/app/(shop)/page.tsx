import { Metadata } from 'next'
import { getProducts } from '@/lib/actions/products'
import { getCategories } from '@/lib/actions/categories'
import { trackEvent } from '@/lib/actions/analytics'
import ProductGrid from '@/components/shop/ProductGrid'
import CategoryFilter from '@/components/shop/CategoryFilter'

export const metadata: Metadata = {
  title: 'Каталог товаров',
  description: 'Просматривайте наш каталог товаров и оформляйте заказы через WhatsApp',
}

interface HomeProps {
  searchParams: Promise<{ category?: string }>
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { category } = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ])

  await trackEvent('page_view_catalog').catch(() => {})

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter categories={categories} activeCategory={category} />
        </div>
      )}
      <ProductGrid products={products} />
    </div>
  )
}

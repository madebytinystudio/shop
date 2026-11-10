import { Metadata } from 'next'
import { getProducts } from '@/lib/actions/products'
import { getCategories } from '@/lib/actions/categories'
import { trackEvent } from '@/lib/actions/analytics'
import ProductGrid from '@/components/shop/ProductGrid'
import CategorySidebar from '@/components/shop/CategorySidebar'
import CategoryBar from '@/components/shop/CategoryBar'

export const metadata: Metadata = {
  title: 'Каталог',
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
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-6 md:py-10">
      {/* Mobile: horizontal category bar */}
      {categories.length > 0 && (
        <div className="md:hidden sticky top-14 z-40 bg-white -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 border-b border-zinc-100">
          <CategoryBar categories={categories} activeCategory={category} />
        </div>
      )}

      <div className="flex gap-12 items-start">
        {/* Desktop: sidebar */}
        {categories.length > 0 && (
          <div className="hidden md:block sticky top-14 self-start max-h-[calc(100vh-56px)] overflow-y-auto pt-10">
            <CategorySidebar categories={categories} activeCategory={category} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

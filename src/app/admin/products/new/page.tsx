import { getCategories } from '@/lib/actions/categories'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Новый товар</h1>
      <ProductForm categories={categories} />
    </div>
  )
}

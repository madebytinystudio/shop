import { getCategories } from '@/lib/actions/categories'
import CategoryList from '@/components/admin/CategoryList'

export default async function AdminCategoriesPage() {
  const categories = await getCategories()
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Категории</h1>
      <CategoryList categories={categories} />
    </div>
  )
}

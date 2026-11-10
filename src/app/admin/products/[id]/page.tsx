import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { getCategories } from '@/lib/actions/categories'
import ProductForm from '@/components/admin/ProductForm'
import ImageManager from '@/components/admin/ImageManager'
import { ProductWithImages } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('id', id)
    .single()

  if (error || !data) notFound()
  const product = data as ProductWithImages
  const categories = await getCategories()

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Редактировать товар</h1>
      <div className="mb-10">
        <h2 className="text-sm font-medium text-zinc-700 mb-4">Фотографии</h2>
        <ImageManager product={product} />
      </div>
      <ProductForm categories={categories} product={product} />
    </div>
  )
}

'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ProductWithImages } from '@/types/database'

export async function getProducts(categoryId?: string): Promise<ProductWithImages[]> {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('status', 'active')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query
  if (error) throw error
  return (data as ProductWithImages[]) ?? []
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error) return null
  return data as ProductWithImages
}

export async function getAllProductsAdmin(): Promise<ProductWithImages[]> {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as ProductWithImages[]) ?? []
}

export async function createProduct(formData: FormData): Promise<{ id: string }> {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const categoryId = formData.get('category_id') as string
  const status = formData.get('status') as 'active' | 'hidden'

  const specsRaw = formData.get('specs') as string
  let specs = null
  if (specsRaw) {
    try { specs = JSON.parse(specsRaw) } catch {}
  }

  const { data, error } = await supabase
    .from('products')
    .insert({ name, slug, price, description: description || null, specs, category_id: categoryId || null, status: status || 'active' })
    .select()
    .single()

  if (error) throw error
  revalidatePath('/')
  revalidatePath('/admin/products')
  return data as { id: string }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const categoryId = formData.get('category_id') as string
  const status = formData.get('status') as 'active' | 'hidden'

  const specsRaw = formData.get('specs') as string
  let specs = null
  if (specsRaw) {
    try { specs = JSON.parse(specsRaw) } catch {}
  }

  const { error } = await supabase
    .from('products')
    .update({ name, slug, price, description: description || null, specs, category_id: categoryId || null, status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/')
  revalidatePath('/admin/products')
  revalidatePath(`/products/${slug}`)
}

export async function deleteProduct(id: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/')
  revalidatePath('/admin/products')
}

export async function uploadProductImage(productId: string, file: File, isPrimary: boolean) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const ext = file.name.split('.').pop()
  const fileName = `${productId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(fileName, file, { contentType: file.type })

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName)

  if (isPrimary) {
    await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId)
  }

  const { data, error } = await supabase
    .from('product_images')
    .insert({ product_id: productId, url: publicUrl, is_primary: isPrimary, sort_order: 0 })
    .select()
    .single()

  if (error) throw error
  revalidatePath(`/admin/products/${productId}`)
  return data
}

export async function deleteProductImage(imageId: string, productId: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: img } = await supabase.from('product_images').select('url').eq('id', imageId).single()
  if (img) {
    const path = img.url.split('/storage/v1/object/public/products/')[1]
    if (path) await supabase.storage.from('products').remove([path])
  }

  const { error } = await supabase.from('product_images').delete().eq('id', imageId)
  if (error) throw error
  revalidatePath(`/admin/products/${productId}`)
}

export async function setPrimaryImage(imageId: string, productId: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId)
  await supabase.from('product_images').update({ is_primary: true }).eq('id', imageId)
  revalidatePath(`/admin/products/${productId}`)
}

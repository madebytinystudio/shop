'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Category } from '@/types/database'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createCategory(formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string

  const { error } = await supabase.from('categories').insert({ name, slug })
  if (error) throw error
  revalidatePath('/admin/categories')
  revalidatePath('/')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string

  const { error } = await supabase.from('categories').update({ name, slug, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/categories')
  revalidatePath('/')
}

export async function deleteCategory(id: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/categories')
  revalidatePath('/')
}

'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Page } from '@/types/database'

export async function getPage(slug: string): Promise<Page | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
  return data
}

export async function getAllPages(): Promise<Page[]> {
  const supabase = await createAdminClient()
  const { data } = await supabase.from('pages').select('*').order('slug')
  return data ?? []
}

export async function updatePage(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase
    .from('pages')
    .update({ title, content: content || null, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/pages')
}

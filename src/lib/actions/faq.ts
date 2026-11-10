'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface FaqItem {
  id: string
  section_id: string
  question: string
  answer: string
  sort_order: number
}

export interface FaqSection {
  id: string
  title: string
  sort_order: number
  faq_items: FaqItem[]
}

export async function getFaqSections(): Promise<FaqSection[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('faq_sections')
    .select('*, faq_items(*)')
    .order('sort_order')
    .order('sort_order', { referencedTable: 'faq_items' })
  return (data ?? []) as FaqSection[]
}

export async function createFaqSection(formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const title = formData.get('title') as string
  const { data: existing } = await supabase.from('faq_sections').select('sort_order').order('sort_order', { ascending: false }).limit(1)
  const sort_order = (existing?.[0]?.sort_order ?? -1) + 1
  await supabase.from('faq_sections').insert({ title, sort_order })
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

export async function updateFaqSection(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  await supabase.from('faq_sections').update({ title: formData.get('title') as string }).eq('id', id)
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

export async function deleteFaqSection(id: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  await supabase.from('faq_sections').delete().eq('id', id)
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

export async function createFaqItem(sectionId: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: existing } = await supabase.from('faq_items').select('sort_order').eq('section_id', sectionId).order('sort_order', { ascending: false }).limit(1)
  const sort_order = (existing?.[0]?.sort_order ?? -1) + 1
  await supabase.from('faq_items').insert({
    section_id: sectionId,
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    sort_order,
  })
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

export async function updateFaqItem(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  await supabase.from('faq_items').update({
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
  }).eq('id', id)
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

export async function deleteFaqItem(id: string) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  await supabase.from('faq_items').delete().eq('id', id)
  revalidatePath('/faq')
  revalidatePath('/admin/faq')
}

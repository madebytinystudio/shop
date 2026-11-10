'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', keys)
  const result: Record<string, string> = {}
  for (const row of data ?? []) result[row.key] = row.value
  return result
}

export async function updateSettings(formData: FormData) {
  const supabase = await createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const entries = [...formData.entries()].map(([key, value]) => ({
    key,
    value: String(value),
  }))

  for (const { key, value } of entries) {
    await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })
  }

  revalidatePath('/about')
  revalidatePath('/contact')
}

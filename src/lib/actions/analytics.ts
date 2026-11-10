'use server'

import { createClient } from '@/lib/supabase/server'

export async function trackEvent(
  eventType: string,
  options?: {
    productId?: string
    productName?: string
    pageUrl?: string
    referrer?: string
  }
) {
  try {
    const supabase = await createClient()
    await supabase.from('analytics_events').insert({
      event_type: eventType,
      product_id: options?.productId ?? null,
      product_name: options?.productName ?? null,
      page_url: options?.pageUrl ?? null,
      referrer: options?.referrer ?? null,
    })
  } catch {
    // Analytics failures should never break UX
  }
}

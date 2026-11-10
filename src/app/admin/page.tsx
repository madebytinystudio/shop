import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/server'

async function getStats() {
  const supabase = await createAdminClient()
  const [products, categories, events] = await Promise.all([
    supabase.from('products').select('id, status', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('analytics_events').select('event_type').gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  const waClicks = events.data?.filter(e => e.event_type === 'whatsapp_order_click').length ?? 0
  const pageViews = events.data?.filter(e => e.event_type === 'page_view_catalog').length ?? 0

  return {
    totalProducts: products.count ?? 0,
    activeProducts: products.data?.filter(p => p.status === 'active').length ?? 0,
    totalCategories: categories.count ?? 0,
    waClicksWeek: waClicks,
    pageViewsWeek: pageViews,
  }
}

export default async function AdminHomePage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Обзор</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Товаров всего', value: stats.totalProducts },
          { label: 'Активных', value: stats.activeProducts },
          { label: 'Категорий', value: stats.totalCategories },
          { label: 'Кликов WhatsApp (7 дней)', value: stats.waClicksWeek },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-zinc-200 rounded-lg p-5">
            <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/products/new', label: 'Добавить товар', desc: 'Создать новую карточку товара' },
          { href: '/admin/categories', label: 'Категории', desc: 'Управление категориями' },
          { href: '/admin/pages', label: 'Страницы', desc: 'Редактировать тексты страниц' },
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-400 transition-colors"
          >
            <p className="text-sm font-medium text-zinc-900 mb-1">{link.label}</p>
            <p className="text-xs text-zinc-400">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

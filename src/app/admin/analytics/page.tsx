import { createAdminClient } from '@/lib/supabase/server'

async function getAnalytics() {
  const supabase = await createAdminClient()
  const { data } = await supabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  return data ?? []
}

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, number> {
  return arr.reduce((acc, item) => {
    const k = key(item)
    acc[k] = (acc[k] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
}

export default async function AdminAnalyticsPage() {
  const events = await getAnalytics()

  const totalViews = events.filter(e => e.event_type === 'page_view_catalog').length
  const productViews = events.filter(e => e.event_type === 'product_view').length
  const waClicks = events.filter(e => e.event_type === 'whatsapp_order_click').length
  const convRate = productViews > 0 ? ((waClicks / productViews) * 100).toFixed(1) : '0'

  const productViewsByName = groupBy(
    events.filter(e => e.event_type === 'product_view' && e.product_name),
    e => e.product_name!
  )

  const productClicksByName = groupBy(
    events.filter(e => e.event_type === 'whatsapp_order_click' && e.product_name),
    e => e.product_name!
  )

  const topViewed = Object.entries(productViewsByName).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const topClicked = Object.entries(productClicksByName).sort((a, b) => b[1] - a[1]).slice(0, 10)

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Аналитика</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Просмотров каталога', value: totalViews },
          { label: 'Просмотров товаров', value: productViews },
          { label: 'Кликов WhatsApp', value: waClicks },
          { label: 'Конверсия (%)', value: convRate },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-zinc-200 rounded-lg p-5">
            <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <h2 className="text-sm font-medium text-zinc-700 mb-4">Топ просматриваемых товаров</h2>
          {topViewed.length === 0 ? (
            <p className="text-zinc-400 text-sm">Нет данных</p>
          ) : (
            <ol className="space-y-2">
              {topViewed.map(([name, count]) => (
                <li key={name} className="flex justify-between text-sm">
                  <span className="text-zinc-700 truncate">{name}</span>
                  <span className="text-zinc-400 ml-2">{count}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <h2 className="text-sm font-medium text-zinc-700 mb-4">Топ товаров по кликам WhatsApp</h2>
          {topClicked.length === 0 ? (
            <p className="text-zinc-400 text-sm">Нет данных</p>
          ) : (
            <ol className="space-y-2">
              {topClicked.map(([name, count]) => (
                <li key={name} className="flex justify-between text-sm">
                  <span className="text-zinc-700 truncate">{name}</span>
                  <span className="text-zinc-400 ml-2">{count}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  )
}

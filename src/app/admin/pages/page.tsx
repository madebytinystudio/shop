import { getAllPages } from '@/lib/actions/pages'
import PageEditor from '@/components/admin/PageEditor'

export default async function AdminPagesPage() {
  const pages = await getAllPages()
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Страницы</h1>
      <div className="space-y-4">
        {pages.map(page => (
          <PageEditor key={page.id} page={page} />
        ))}
      </div>
    </div>
  )
}

import { getFaqSections } from '@/lib/actions/faq'
import FaqAdmin from './faq-admin'

export default async function AdminFaqPage() {
  const sections = await getFaqSections()
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">FAQ</h1>
      <FaqAdmin sections={sections} />
    </div>
  )
}

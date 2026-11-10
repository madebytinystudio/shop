import { getFaqSections } from '@/lib/actions/faq'
import FaqClient from './faq-client'

export default async function FaqPage() {
  const sections = await getFaqSections()
  return <FaqClient sections={sections} />
}

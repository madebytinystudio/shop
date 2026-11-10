import { getSettings } from '@/lib/actions/settings'
import SettingsForm from './SettingsForm'

export default async function AdminSettingsPage() {
  const s = await getSettings([
    'contact_phone', 'contact_hours', 'contact_city',
    'about_story_left', 'about_story_right',
    'about_founders_name', 'about_founders_text',
    'about_crafted_text',
  ])
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 mb-8">Настройки сайта</h1>
      <SettingsForm settings={s} />
    </div>
  )
}

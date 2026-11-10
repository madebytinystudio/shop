'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateSettings } from '@/lib/actions/settings'

const FIELD_GROUPS = [
  {
    title: 'Контакты',
    fields: [
      { key: 'contact_phone', label: 'Телефон', rows: 1 },
      { key: 'contact_hours', label: 'Часы работы', rows: 1 },
      { key: 'contact_city', label: 'Город', rows: 1 },
    ],
  },
  {
    title: 'О нас — история',
    fields: [
      { key: 'about_story_left', label: 'Левая колонка (абзацы через пустую строку)', rows: 5 },
      { key: 'about_story_right', label: 'Правая колонка (абзацы через пустую строку)', rows: 5 },
    ],
  },
  {
    title: 'О нас — основатели',
    fields: [
      { key: 'about_founders_name', label: 'Имена основателей', rows: 1 },
      { key: 'about_founders_text', label: 'Текст о основателях', rows: 3 },
    ],
  },
  {
    title: 'О нас — о магазине',
    fields: [
      { key: 'about_crafted_text', label: 'Текст (абзацы через пустую строку)', rows: 6 },
    ],
  },
]

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateSettings(formData)
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {FIELD_GROUPS.map(group => (
        <div key={group.title}>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4">{group.title}</h2>
          <div className="space-y-4 bg-white border border-zinc-200 rounded-lg p-4">
            {group.fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-zinc-500 mb-1">{field.label}</label>
                {field.rows === 1 ? (
                  <input
                    name={field.key}
                    defaultValue={settings[field.key] ?? ''}
                    className="w-full border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                ) : (
                  <textarea
                    name={field.key}
                    rows={field.rows}
                    defaultValue={settings[field.key] ?? ''}
                    className="w-full border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-y"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={pending}
        className="bg-zinc-900 text-white px-6 py-2.5 text-sm rounded disabled:opacity-50"
      >
        {pending ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Page } from '@/types/database'
import { updatePage } from '@/lib/actions/pages'

interface PageEditorProps {
  page: Page
}

export default function PageEditor({ page }: PageEditorProps) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updatePage(page.id, formData)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-lg">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-zinc-900">{page.title}</span>
        <span className="text-xs text-zinc-400 font-mono">/{page.slug}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="border-t border-zinc-100 p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Заголовок</label>
            <input
              name="title"
              required
              defaultValue={page.title}
              className="w-full border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Содержимое</label>
            <textarea
              name="content"
              rows={8}
              defaultValue={page.content ?? ''}
              className="w-full border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-y"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="bg-zinc-900 text-white px-4 py-2 text-sm rounded disabled:opacity-50">
              {pending ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-zinc-700 px-4 py-2">
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

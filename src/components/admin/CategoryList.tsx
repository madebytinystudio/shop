'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/types/database'
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories'
import { slugify } from '@/lib/utils'

interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [pending, startTransition] = useTransition()
  const [editing, setEditing] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const router = useRouter()

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    startTransition(async () => {
      await createCategory(formData)
      form.reset()
      setNewName('')
      router.refresh()
    })
  }

  const handleUpdate = (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateCategory(id, formData)
      setEditing(null)
      router.refresh()
    })
  }

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Удалить категорию «${name}»?`)) return
    startTransition(async () => {
      await deleteCategory(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-8">Категорий пока нет</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {categories.map(cat => (
              <li key={cat.id} className="px-4 py-3">
                {editing === cat.id ? (
                  <form onSubmit={(e) => handleUpdate(cat.id, e)} className="flex gap-2">
                    <input name="name" defaultValue={cat.name} required className="flex-1 border border-zinc-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900" />
                    <input name="slug" defaultValue={cat.slug} required className="w-32 border border-zinc-200 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-900" />
                    <button type="submit" disabled={pending} className="text-sm text-zinc-900 font-medium">OK</button>
                    <button type="button" onClick={() => setEditing(null)} className="text-sm text-zinc-400">Отмена</button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-zinc-900">{cat.name}</span>
                      <span className="text-xs text-zinc-400 ml-2 font-mono">{cat.slug}</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditing(cat.id)} className="text-xs text-zinc-400 hover:text-zinc-700">Изменить</button>
                      <button onClick={() => handleDelete(cat.id, cat.name)} className="text-xs text-red-400 hover:text-red-600">Удалить</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleCreate} className="bg-white border border-zinc-200 rounded-lg p-4">
        <p className="text-sm font-medium text-zinc-700 mb-3">Новая категория</p>
        <div className="flex gap-2">
          <input
            name="name"
            required
            placeholder="Название"
            value={newName}
            onChange={e => {
              setNewName(e.target.value)
              const form = e.currentTarget.form
              const slugInput = form?.elements.namedItem('slug') as HTMLInputElement
              if (slugInput) slugInput.value = slugify(e.target.value)
            }}
            className="flex-1 border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <input
            name="slug"
            required
            placeholder="slug"
            className="w-28 border border-zinc-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-zinc-900 text-white px-4 py-2 text-sm rounded hover:bg-zinc-700 disabled:opacity-50"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  )
}

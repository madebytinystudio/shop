'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  createFaqSection, updateFaqSection, deleteFaqSection,
  createFaqItem, updateFaqItem, deleteFaqItem,
  type FaqSection,
} from '@/lib/actions/faq'

function ItemRow({ item, sectionId }: { item: FaqSection['faq_items'][0]; sectionId: string }) {
  const [editing, setEditing] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await updateFaqItem(item.id, new FormData(e.currentTarget))
      setEditing(false)
      router.refresh()
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteFaqItem(item.id)
      router.refresh()
    })
  }

  if (editing) {
    return (
      <form onSubmit={handleUpdate} className="p-3 bg-zinc-50 rounded space-y-2">
        <input name="question" defaultValue={item.question} required className="w-full border border-zinc-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900" />
        <textarea name="answer" defaultValue={item.answer} rows={3} required className="w-full border border-zinc-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-y" />
        <div className="flex gap-2">
          <button type="submit" disabled={pending} className="bg-zinc-900 text-white px-3 py-1 text-xs rounded disabled:opacity-50">{pending ? '...' : 'Сохранить'}</button>
          <button type="button" onClick={() => setEditing(false)} className="text-xs text-zinc-400 hover:text-zinc-700 px-3 py-1">Отмена</button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex items-start justify-between gap-3 py-2 px-3 rounded hover:bg-zinc-50 group">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-zinc-700 truncate">{item.question}</p>
        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{item.answer}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 shrink-0">
        <button onClick={() => setEditing(true)} className="text-xs text-zinc-400 hover:text-zinc-900">Ред.</button>
        <button onClick={handleDelete} disabled={pending} className="text-xs text-red-400 hover:text-red-600">Удалить</button>
      </div>
    </div>
  )
}

function NewItemForm({ sectionId }: { sectionId: string }) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    startTransition(async () => {
      await createFaqItem(sectionId, new FormData(form))
      form.reset()
      setOpen(false)
      router.refresh()
    })
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} className="text-xs text-zinc-400 hover:text-zinc-900 mt-2 px-3 py-1">+ Добавить вопрос</button>
  )

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-zinc-50 rounded space-y-2 mt-2">
      <input name="question" placeholder="Вопрос" required className="w-full border border-zinc-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900" />
      <textarea name="answer" placeholder="Ответ" rows={3} required className="w-full border border-zinc-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-y" />
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="bg-zinc-900 text-white px-3 py-1 text-xs rounded disabled:opacity-50">{pending ? '...' : 'Добавить'}</button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-700 px-3 py-1">Отмена</button>
      </div>
    </form>
  )
}

function SectionCard({ section }: { section: FaqSection }) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleUpdateTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await updateFaqSection(section.id, new FormData(e.currentTarget))
      setEditingTitle(false)
      router.refresh()
    })
  }

  const handleDelete = () => {
    if (!confirm(`Удалить раздел «${section.title}» и все его вопросы?`)) return
    startTransition(async () => {
      await deleteFaqSection(section.id)
      router.refresh()
    })
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
        {editingTitle ? (
          <form onSubmit={handleUpdateTitle} className="flex gap-2 flex-1">
            <input name="title" defaultValue={section.title} required className="flex-1 border border-zinc-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            <button type="submit" disabled={pending} className="bg-zinc-900 text-white px-3 py-1 text-xs rounded">{pending ? '...' : 'ОК'}</button>
            <button type="button" onClick={() => setEditingTitle(false)} className="text-xs text-zinc-400 px-2">✕</button>
          </form>
        ) : (
          <>
            <span className="text-sm font-medium text-zinc-900">{section.title}</span>
            <div className="flex gap-3">
              <button onClick={() => setEditingTitle(true)} className="text-xs text-zinc-400 hover:text-zinc-900">Переименовать</button>
              <button onClick={handleDelete} disabled={pending} className="text-xs text-red-400 hover:text-red-600">Удалить раздел</button>
            </div>
          </>
        )}
      </div>
      <div className="p-2">
        {section.faq_items.map(item => (
          <ItemRow key={item.id} item={item} sectionId={section.id} />
        ))}
        <NewItemForm sectionId={section.id} />
      </div>
    </div>
  )
}

export default function FaqAdmin({ sections }: { sections: FaqSection[] }) {
  const [addingSection, setAddingSection] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleAddSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    startTransition(async () => {
      await createFaqSection(new FormData(form))
      form.reset()
      setAddingSection(false)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      {sections.map(s => <SectionCard key={s.id} section={s} />)}

      {addingSection ? (
        <form onSubmit={handleAddSection} className="flex gap-2">
          <input name="title" placeholder="Название раздела" required className="flex-1 border border-zinc-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          <button type="submit" disabled={pending} className="bg-zinc-900 text-white px-4 py-2 text-sm rounded disabled:opacity-50">{pending ? '...' : 'Добавить'}</button>
          <button type="button" onClick={() => setAddingSection(false)} className="text-sm text-zinc-400 hover:text-zinc-700 px-3 py-2">Отмена</button>
        </form>
      ) : (
        <button onClick={() => setAddingSection(true)} className="text-sm text-zinc-400 hover:text-zinc-900 py-2">+ Добавить раздел</button>
      )}
    </div>
  )
}

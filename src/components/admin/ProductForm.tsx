'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/actions/products'
import { Category, ProductWithImages } from '@/types/database'
import { slugify } from '@/lib/utils'

interface SpecRow { key: string; value: string }

function SpecsEditor({ initial }: { initial: SpecRow[] }) {
  const [rows, setRows] = useState<SpecRow[]>(initial.length ? initial : [{ key: '', value: '' }])

  const update = (i: number, field: 'key' | 'value', val: string) =>
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: val } : row))

  const add = () => setRows(r => [...r, { key: '', value: '' }])

  const remove = (i: number) =>
    setRows(r => r.length === 1 ? [{ key: '', value: '' }] : r.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            name="spec_key"
            value={row.key}
            onChange={e => update(i, 'key', e.target.value)}
            placeholder="Название"
            className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <input
            name="spec_value"
            value={row.value}
            onChange={e => update(i, 'value', e.target.value)}
            placeholder="Значение"
            className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="shrink-0 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors rounded"
            aria-label="Удалить"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
      >
        + Добавить характеристику
      </button>
    </div>
  )
}

interface ProductFormProps {
  product?: ProductWithImages
  categories: Category[]
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const initialSpecs: SpecRow[] = product?.specs
    ? Object.entries(product.specs as Record<string, string>).map(([key, value]) => ({ key, value }))
    : []

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      try {
        if (product) {
          await updateProduct(product.id, formData)
          router.refresh()
        } else {
          const created = await createProduct(formData)
          router.push(`/admin/products/${created.id}`)
        }
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Произошла ошибка')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Название *</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          onChange={(e) => {
            if (!product) {
              const slugInput = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement
              if (slugInput) slugInput.value = slugify(e.target.value)
            }
          }}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">URL slug *</label>
        <input
          name="slug"
          required
          defaultValue={product?.slug}
          pattern="[a-z0-9-]+"
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Цена (₸) *</label>
        <input
          name="price"
          type="number"
          required
          min="0"
          step="1"
          defaultValue={product?.price}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Категория</label>
        <select
          name="category_id"
          defaultValue={product?.category_id ?? ''}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="">Без категории</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Описание</label>
        <textarea
          name="description"
          rows={5}
          defaultValue={product?.description ?? ''}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Характеристики
          <span className="text-zinc-400 font-normal ml-1">— необязательно</span>
        </label>
        <SpecsEditor initial={initialSpecs} />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Статус</label>
        <select
          name="status"
          defaultValue={product?.status ?? 'active'}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="active">Активен</option>
          <option value="hidden">Скрыт</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-zinc-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
      >
        {pending ? 'Сохранение...' : product ? 'Сохранить изменения' : 'Создать товар'}
      </button>
    </form>
  )
}

'use client'

import { deleteProduct } from '@/lib/actions/products'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (!confirm(`Удалить товар «${name}»? Это действие нельзя отменить.`)) return
    startTransition(async () => {
      await deleteProduct(id)
      router.refresh()
    })
  }

  return (
    <button onClick={handleDelete} disabled={pending} className="text-red-400 hover:text-red-600 text-xs disabled:opacity-50">
      {pending ? '...' : 'Удалить'}
    </button>
  )
}

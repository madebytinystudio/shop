import Link from 'next/link'
import Image from 'next/image'
import { getAllProductsAdmin } from '@/lib/actions/products'
import { formatPrice } from '@/lib/format'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-zinc-900">Товары ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="bg-zinc-900 text-white px-4 py-2 text-sm rounded-md hover:bg-zinc-700 transition-colors"
        >
          + Добавить товар
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
        {products.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-12">Товаров пока нет</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-3 text-zinc-500 font-medium w-12"></th>
                <th className="text-left px-4 py-3 text-zinc-500 font-medium">Название</th>
                <th className="text-left px-4 py-3 text-zinc-500 font-medium hidden sm:table-cell">Цена</th>
                <th className="text-left px-4 py-3 text-zinc-500 font-medium hidden sm:table-cell">Статус</th>
                <th className="text-right px-4 py-3 text-zinc-500 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map(product => {
                const img = product.product_images?.find(i => i.is_primary) ?? product.product_images?.[0]
                return (
                  <tr key={product.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded overflow-hidden">
                        {img && <Image src={img.url} alt={product.name} width={40} height={40} className="w-full h-full object-cover" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/${product.id}`} className="font-medium text-zinc-900 hover:underline">
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 hidden sm:table-cell">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                        {product.status === 'active' ? 'Активен' : 'Скрыт'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className="text-zinc-400 hover:text-zinc-700 text-xs">Изменить</Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

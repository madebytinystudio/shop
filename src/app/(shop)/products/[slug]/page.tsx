import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getProducts } from '@/lib/actions/products'
import { trackEvent } from '@/lib/actions/analytics'
import { formatPrice, buildWhatsAppUrl } from '@/lib/format'
import WhatsAppButton from '@/components/shop/WhatsAppButton'
import ProductGallery from '@/components/shop/ProductGallery'
import { Json } from '@/types/database'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Товар не найден' }

  const image = product.product_images?.find(i => i.is_primary) ?? product.product_images?.[0]

  return {
    title: product.name,
    description: product.description ?? `${product.name} — ${formatPrice(product.price)}`,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: image ? [image.url] : [],
    },
  }
}

export const dynamic = 'force-dynamic'

function renderSpecs(specs: Json): { key: string; value: string }[] {
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return []
  return Object.entries(specs as Record<string, unknown>).map(([key, value]) => ({
    key,
    value: String(value),
  }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const productUrl = `${siteUrl}/products/${product.slug}`
  const waUrl = buildWhatsAppUrl(product.name, product.price, productUrl)

  await trackEvent('product_view', {
    productId: product.id,
    productName: product.name,
    pageUrl: productUrl,
  }).catch(() => {})

  const specs = renderSpecs(product.specs)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-8 inline-block">
        ← Назад к каталогу
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={product.product_images ?? []} productName={product.name} />

        <div className="flex flex-col">
          {product.categories && (
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">{product.categories.name}</p>
          )}
          <h1 className="text-2xl font-semibold text-zinc-900 mb-3 leading-snug">{product.name}</h1>
          <p className="text-2xl font-medium text-zinc-900 mb-6">{formatPrice(product.price)}</p>

          <WhatsAppButton
            url={waUrl}
            productId={product.id}
            productName={product.name}
            variant="order"
            className="mb-6"
          />

          {product.description && (
            <div className="border-t border-zinc-100 pt-6">
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {specs.length > 0 && (
            <div className="border-t border-zinc-100 pt-6 mt-6">
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4">Характеристики</p>
              <dl className="space-y-2">
                {specs.map(({ key, value }) => (
                  <div key={key} className="flex gap-4 text-sm">
                    <dt className="text-zinc-400 w-32 shrink-0">{key}</dt>
                    <dd className="text-zinc-700">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

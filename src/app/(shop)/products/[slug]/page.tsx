import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts } from '@/lib/actions/products'
import { trackEvent } from '@/lib/actions/analytics'
import { formatPrice, buildWhatsAppUrl } from '@/lib/format'
import WhatsAppButton from '@/components/shop/WhatsAppButton'
import ProductGallery from '@/components/shop/ProductGallery'
import ProductCard from '@/components/shop/ProductCard'
import { Json } from '@/types/database'

export const dynamic = 'force-dynamic'

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
  const related = await getRelatedProducts(product.id, product.category_id ?? null, 4)

  return (
    <>
      {/* Full-screen split layout */}
      <div className="flex flex-col md:flex-row items-start">

        {/* Left: scrolling images */}
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.product_images ?? []} productName={product.name} />
        </div>

        {/* Right: sticky info panel */}
        <div className="w-full md:w-1/2 md:sticky md:top-14 md:h-[calc(100vh-56px)] md:overflow-y-auto px-8 md:px-14 py-10 md:py-16 flex flex-col">
          {product.categories && (
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">
              {product.categories.name}
            </p>
          )}

          <h1 className="text-xl font-medium text-zinc-900 mb-4 leading-snug">
            {product.name}
          </h1>

          <p className="text-xl text-zinc-900 mb-8">
            {formatPrice(product.price)}
          </p>

          <WhatsAppButton
            url={waUrl}
            productId={product.id}
            productName={product.name}
            variant="order"
            className="mb-8"
          />

          {product.description && (
            <div className="border-t border-zinc-100 pt-7">
              <p className="text-sm text-zinc-500 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {specs.length > 0 && (
            <div className="border-t border-zinc-100 pt-7 mt-7">
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-5">Характеристики</p>
              <dl className="space-y-3">
                {specs.map(({ key, value }) => (
                  <div key={key} className="flex gap-6 text-sm">
                    <dt className="text-zinc-400 w-28 shrink-0 text-xs uppercase tracking-wide">{key}</dt>
                    <dd className="text-zinc-700">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="container-page mt-16 mb-10">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">Похожие товары</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

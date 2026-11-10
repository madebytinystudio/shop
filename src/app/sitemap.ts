import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/actions/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const products = await getProducts()

  const productUrls = products.map(p => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/pages/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/pages/delivery`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/pages/payment`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/pages/contacts`, changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
  ]
}

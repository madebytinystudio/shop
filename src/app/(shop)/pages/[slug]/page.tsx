import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage } from '@/lib/actions/pages'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  return { title: page?.title ?? 'Страница' }
}

export default async function StaticPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-8">{page.title}</h1>
      {page.content ? (
        <div className="prose prose-zinc max-w-none text-sm leading-relaxed whitespace-pre-line text-zinc-600">
          {page.content}
        </div>
      ) : (
        <p className="text-zinc-400">Содержимое страницы скоро появится.</p>
      )}
    </div>
  )
}

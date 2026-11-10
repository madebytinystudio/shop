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

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>
      }
      return part
    })
    if (line === '') return <br key={i} />
    return <p key={i} className="mb-1">{parts}</p>
  })
}

export default async function StaticPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
      <h1 className="text-xl font-semibold tracking-wide text-zinc-900 mb-10">{page.title}</h1>
      {page.content ? (
        <div className="text-sm leading-relaxed text-zinc-500 space-y-0">
          {renderContent(page.content)}
        </div>
      ) : (
        <p className="text-zinc-400 text-sm">Содержимое страницы скоро появится.</p>
      )}
    </div>
  )
}

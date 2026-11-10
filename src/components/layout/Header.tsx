import Link from 'next/link'
import { buildWhatsAppGeneralUrl } from '@/lib/format'
import WhatsAppButton from '@/components/shop/WhatsAppButton'

export default function Header() {
  const waUrl = buildWhatsAppGeneralUrl()

  return (
    <header className="border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight text-zinc-900">
          Магазин
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/pages/about" className="hover:text-zinc-900 transition-colors">О нас</Link>
          <Link href="/pages/delivery" className="hover:text-zinc-900 transition-colors">Доставка</Link>
          <Link href="/pages/contacts" className="hover:text-zinc-900 transition-colors">Контакты</Link>
        </nav>
        <WhatsAppButton url={waUrl} variant="general" />
      </div>
    </header>
  )
}

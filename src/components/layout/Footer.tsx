import Link from 'next/link'
import { buildWhatsAppGeneralUrl } from '@/lib/format'

export default function Footer() {
  return (
    <footer className="bg-white mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row sm:justify-between gap-10">

        {/* Left: brand */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 mb-3">WE OPEN ON SNOWY DAYS</p>
          <p className="text-zinc-400 text-xs">Казахстан</p>
        </div>

        {/* Right: nav columns */}
        <div className="flex gap-14 sm:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 mb-4">Информация</p>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><Link href="/about" className="hover:text-zinc-900 transition-colors">О нас</Link></li>
              <li><Link href="/faq" className="hover:text-zinc-900 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 mb-4">Контакты</p>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href={buildWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">Контакты</Link></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}

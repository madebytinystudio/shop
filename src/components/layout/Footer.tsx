import Link from 'next/link'
import { buildWhatsAppGeneralUrl } from '@/lib/format'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 mb-4">WE OPEN ON SNOWY DAYS</p>
            <p className="text-zinc-400 text-xs leading-relaxed">Казахстан</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 mb-4">Информация</p>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><Link href="/pages/about" className="hover:text-zinc-900 transition-colors">О нас</Link></li>
              <li><Link href="/pages/delivery" className="hover:text-zinc-900 transition-colors">Доставка</Link></li>
              <li><Link href="/pages/payment" className="hover:text-zinc-900 transition-colors">Оплата и возврат</Link></li>
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
              <li><Link href="/pages/contacts" className="hover:text-zinc-900 transition-colors">Контакты</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-300">© {new Date().getFullYear()} WE OPEN ON SNOWY DAYS</p>
        </div>
      </div>
    </footer>
  )
}

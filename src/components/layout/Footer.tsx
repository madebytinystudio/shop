import Link from 'next/link'
import { buildWhatsAppGeneralUrl } from '@/lib/format'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-medium text-zinc-900 mb-3">Магазин</p>
            <p className="text-zinc-400 text-xs">Казахстан</p>
          </div>
          <div>
            <p className="font-medium text-zinc-900 mb-3">Информация</p>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/pages/about" className="hover:text-zinc-900 transition-colors">О нас</Link></li>
              <li><Link href="/pages/delivery" className="hover:text-zinc-900 transition-colors">Доставка</Link></li>
              <li><Link href="/pages/payment" className="hover:text-zinc-900 transition-colors">Оплата и возврат</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-zinc-900 mb-3">Контакты</p>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <a href={buildWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li><Link href="/pages/contacts" className="hover:text-zinc-900 transition-colors">Контактная информация</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

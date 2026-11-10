import { Metadata } from 'next'
import { buildWhatsAppGeneralUrl } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Контакты',
}

export default function ContactPage() {
  const waUrl = buildWhatsAppGeneralUrl()

  return (
    <div className="bg-white flex flex-col md:flex-row min-h-[calc(100vh-56px)]">

      {/* Left: sticky photo with title */}
      <div className="relative w-full md:w-1/2 h-[55vh] md:h-auto md:sticky md:top-14 md:self-start md:min-h-[calc(100vh-56px)] overflow-hidden flex items-end pb-12 md:pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <h1 className="relative z-10 text-white text-5xl md:text-6xl font-semibold tracking-tight px-8 md:px-12">
          Контакты
        </h1>
      </div>

      {/* Right: contact blocks */}
      <div className="w-full md:w-1/2 px-8 md:px-16 py-14 md:py-24 space-y-14">

        <div>
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-3">(Заказы)</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl text-zinc-900 hover:text-zinc-500 transition-colors"
          >
            +7 771 701 11 51
          </a>
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-3">(WhatsApp)</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl md:text-3xl text-zinc-900 hover:text-zinc-500 transition-colors"
          >
            Написать нам
          </a>
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-3">(Часы работы)</p>
          <p className="text-2xl md:text-3xl text-zinc-900">
            Ежедневно, 10:00–22:00
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-3">(Город)</p>
          <p className="text-2xl md:text-3xl text-zinc-900">
            Алматы, Казахстан
          </p>
        </div>

      </div>
    </div>
  )
}

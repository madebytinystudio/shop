import { Metadata } from 'next'
import Link from 'next/link'
import { buildWhatsAppGeneralUrl } from '@/lib/format'

export const metadata: Metadata = {
  title: 'О нас',
  description: 'История WE OPEN ON SNOWY DAYS — одежда и аксессуары для тех, кто живёт настоящим.',
}

export default function AboutPage() {
  const waUrl = buildWhatsAppGeneralUrl()

  return (
    <div className="bg-white">

      {/* HERO — full-bleed dark image with coordinates + headline */}
      <section className="relative h-[90vh] min-h-[500px] bg-zinc-900 overflow-hidden flex items-end pb-16 md:pb-24">
        {/* Background image using CSS gradient as placeholder — replace with real photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 w-full">
          <p className="text-zinc-400 text-xs tracking-widest uppercase mb-6">
            43.2567° С, 76.9286° В
          </p>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight">
            <em className="font-serif font-normal italic">Рождены</em>{' '}
            из{' '}
            <br />
            снега
          </h1>
        </div>
      </section>

      {/* OUR STORY — label left + 2-col text */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="md:w-40 shrink-0">
            <p className="text-[10px] tracking-widest uppercase text-zinc-400 md:sticky md:top-24">
              Наша история
            </p>
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-5 text-zinc-600 text-base leading-relaxed">
              <p>
                WE OPEN ON SNOWY DAYS появился из простой идеи: самые настоящие вещи рождаются в холод.
                Когда город замедляется, а воздух становится чистым — именно тогда хочется одеваться честно.
              </p>
              <p>
                Мы собираем одежду и аксессуары, которые не кричат о себе. Качество, которое чувствуется в руках.
                Силуэты, которые работают каждый день — от утреннего кофе до позднего вечера.
              </p>
            </div>
            <div className="space-y-5 text-zinc-600 text-base leading-relaxed">
              <p>
                Каждый предмет в нашем каталоге проходит долгий путь отбора. Мы работаем только с теми
                производителями, которые разделяют нашу философию: никакого лишнего, только суть.
              </p>
              <p>
                Алматы — наш дом. Снежные зимы, которые здесь не редкость, дали название магазину
                и определили его характер: спокойный, устойчивый, настоящий.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS — full-bleed image with text overlay */}
      <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-end p-8 md:p-16 max-w-[1280px] mx-auto">
          <div className="max-w-md">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 leading-snug">
              Познакомьтесь с основателями
            </h2>
            <p className="text-zinc-200 text-sm leading-relaxed">
              Айдана и Максим — два человека с разным прошлым и одной страстью к честным вещам.
              Они объединили опыт в моде и логистике, чтобы привезти в Алматы лучшее из мирового стритвира и contemporary.
            </p>
          </div>
        </div>
      </section>

      {/* CRAFTED WITH PURPOSE — text left, image right */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-zinc-900 text-2xl md:text-3xl font-semibold mb-6 leading-snug">
              Собрано с умыслом
            </h2>
            <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
              <p>
                Казахстан — рынок, где качественной одежды долго не было в доступе. Мы изменили это:
                прямые поставки, честные цены, никаких посредников.
              </p>
              <p>
                В итоге — вещи, которые служат годами. Материалы, которые приятно носить в любую погоду.
                Дизайн, который не устаревает за один сезон.
              </p>
              <p>
                Каждая покупка — это разговор. Мы всегда на связи в WhatsApp, помогаем с выбором
                размера и оформлением заказа лично.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Детали одежды"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* MADE WITH CARE — 6 badges */}
      <section className="border-t border-zinc-100 py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <h2 className="text-center text-zinc-900 text-xl md:text-2xl font-semibold mb-16 tracking-wide">
            Наши принципы
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
            {[
              { icon: '✦', label: 'Прямые поставки' },
              { icon: '◈', label: 'Только натуральные материалы' },
              { icon: '◎', label: 'Проверено лично' },
              { icon: '◇', label: 'Без лишней наценки' },
              { icon: '○', label: 'Доставка по всему Казахстану' },
              { icon: '△', label: 'Поддержка в WhatsApp' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-4 text-center">
                <span className="text-2xl text-zinc-300">{icon}</span>
                <span className="text-[10px] tracking-widest uppercase text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS — dark CTA */}
      <section className="relative h-[50vh] min-h-[300px] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-5">
          <h2 className="text-white text-3xl md:text-4xl font-semibold mb-4">Вопросы?</h2>
          <p className="text-zinc-300 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Мы всегда на связи. Напишите нам — ответим быстро.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-zinc-900 text-xs tracking-widest uppercase px-8 py-4 hover:bg-zinc-100 transition-colors"
          >
            Написать в WhatsApp
          </a>
        </div>
      </section>

    </div>
  )
}

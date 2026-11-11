import { Metadata } from 'next'
import { buildWhatsAppGeneralUrl } from '@/lib/format'
import { getSettings } from '@/lib/actions/settings'

export const metadata: Metadata = {
  title: 'О нас',
  description: 'История WE OPEN ON SNOWY DAYS — одежда и аксессуары для тех, кто живёт настоящим.',
}

export default async function AboutPage() {
  const waUrl = buildWhatsAppGeneralUrl()
  const s = await getSettings([
    'about_story_left', 'about_story_right',
    'about_founders_name', 'about_founders_text',
    'about_crafted_text',
  ])

  const storyLeft = s.about_story_left || ''
  const storyRight = s.about_story_right || ''
  const foundersName = s.about_founders_name || ''
  const foundersText = s.about_founders_text || ''
  const craftedText = s.about_crafted_text || ''

  return (
    <div className="bg-white">
      <section className="relative h-[90vh] min-h-[500px] bg-zinc-900 overflow-hidden flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80')` }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container-page w-full">
          <p className="text-zinc-400 text-xs tracking-widest uppercase mb-6">43.2567° С, 76.9286° В</p>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight">
            <em className="font-serif font-normal italic">Рождены</em>{' '}из{' '}<br />снега
          </h1>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="md:w-40 shrink-0">
            <p className="text-[10px] tracking-widest uppercase text-zinc-400 md:sticky md:top-24">Наша история</p>
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-5 text-zinc-600 text-base leading-relaxed">
              {storyLeft.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="space-y-5 text-zinc-600 text-base leading-relaxed">
              {storyRight.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80')` }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-end p-8 md:p-16 max-w-page mx-auto">
          <div className="max-w-md">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 leading-snug">Познакомьтесь с основателями</h2>
            {foundersName && <p className="text-zinc-300 text-sm font-medium mb-2">{foundersName}</p>}
            <p className="text-zinc-200 text-sm leading-relaxed">{foundersText}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-zinc-900 text-2xl md:text-3xl font-semibold mb-6 leading-snug">Собрано с умыслом</h2>
            <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
              {craftedText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Детали одежды" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 py-20 md:py-28">
        <div className="container-page">
          <h2 className="text-center text-zinc-900 text-xl md:text-2xl font-semibold mb-16 tracking-wide">Наши принципы</h2>
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

      <section className="relative h-[50vh] min-h-[300px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')` }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-5">
          <h2 className="text-white text-3xl md:text-4xl font-semibold mb-4">Вопросы?</h2>
          <p className="text-zinc-300 text-sm mb-8 max-w-sm mx-auto leading-relaxed">Мы всегда на связи. Напишите нам — ответим быстро.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-zinc-900 text-xs tracking-widest uppercase px-8 py-4 hover:bg-zinc-100 transition-colors">Написать в WhatsApp</a>
        </div>
      </section>
    </div>
  )
}

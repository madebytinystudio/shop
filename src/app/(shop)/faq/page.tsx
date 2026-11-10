'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  {
    id: 'general',
    title: 'Общие вопросы',
    items: [
      {
        q: 'ЧТО ТАКОЕ WE OPEN ON SNOWY DAYS?',
        a: 'Это магазин одежды и аксессуаров из Алматы. Мы подбираем вещи, которые работают каждый день — без лишнего шума, с упором на качество и честную цену.',
      },
      {
        q: 'КАК ОФОРМИТЬ ЗАКАЗ?',
        a: 'Выберите товар в каталоге и нажмите «Оформить заказ» — откроется WhatsApp с готовым сообщением. Мы ответим, уточним детали и согласуем доставку.',
      },
      {
        q: 'КАК УЗНАВАТЬ О НОВИНКАХ И АКЦИЯХ?',
        a: 'Напишите нам в WhatsApp — добавим вас в список рассылки. Мы отправляем обновления раз в 1–2 недели, без спама.',
      },
      {
        q: 'КАК СВЯЗАТЬСЯ С НАМИ?',
        a: 'Через WhatsApp по номеру +7 771 701 11 51. Работаем ежедневно с 10:00 до 22:00.',
      },
      {
        q: 'КАК ВЫБРАТЬ ПРАВИЛЬНЫЙ РАЗМЕР?',
        a: 'На странице каждого товара есть размерная таблица. Если сомневаетесь — напишите нам в WhatsApp, поможем подобрать по меркам.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Доставка',
    items: [
      {
        q: 'КАКИЕ ВАРИАНТЫ ДОСТАВКИ ВЫ ПРЕДЛАГАЕТЕ?',
        a: 'Курьер по Алматы — 1 500 ₸, доставка 1–2 дня. По Казахстану — СДЭК или Казпочта, 3–7 дней, от 2 000 ₸. Также доступен самовывоз — уточняйте адрес при оформлении.',
      },
      {
        q: 'КАК ДОЛГО ИДЁТ ДОСТАВКА?',
        a: 'По Алматы — 1–2 рабочих дня после подтверждения заказа. По Казахстану — 3–7 дней в зависимости от города.',
      },
      {
        q: 'ВЫ ДОСТАВЛЯЕТЕ В ДРУГИЕ СТРАНЫ?',
        a: 'Пока нет. Работаем только по Казахстану. Если вы находитесь за рубежом — напишите нам, обсудим варианты.',
      },
      {
        q: 'ЧТО ЕСЛИ ЗАКАЗ ПОТЕРЯЛСЯ ИЛИ ПРИШЁЛ ПОВРЕЖДЁННЫМ?',
        a: 'Напишите нам в WhatsApp с фото или описанием проблемы. Решим в течение 24 часов — заменим или вернём деньги.',
      },
      {
        q: 'МОГУ ЛИ Я ОТСЛЕДИТЬ ЗАКАЗ?',
        a: 'Да. После отправки мы пришлём вам номер трекинга в WhatsApp. По Алматы — курьер сообщит о себе заранее.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Оплата и возврат',
    items: [
      {
        q: 'КАКИЕ СПОСОБЫ ОПЛАТЫ ВЫ ПРИНИМАЕТЕ?',
        a: 'Kaspi Gold, наличными при получении, переводом на карту. Все способы согласуем при оформлении заказа.',
      },
      {
        q: 'МОГУ ЛИ Я ВЕРНУТЬ ИЛИ ОБМЕНЯТЬ ТОВАР?',
        a: 'Да, принимаем возврат в течение 14 дней с момента получения. Товар должен быть без следов носки, в оригинальной упаковке.',
      },
      {
        q: 'КАК ОФОРМИТЬ ВОЗВРАТ?',
        a: 'Напишите нам в WhatsApp — уточним детали и согласуем удобный способ возврата. Курьер заберёт товар или вы сможете вернуть самовывозом.',
      },
      {
        q: 'В КАКОМ СОСТОЯНИИ ДОЛЖЕН БЫТЬ ТОВАР ДЛЯ ВОЗВРАТА?',
        a: 'Товар должен быть без следов использования, в оригинальной упаковке, со всеми этикетками. Нижнее бельё и купальники возврату не подлежат.',
      },
      {
        q: 'КОГДА Я ПОЛУЧУ ДЕНЬГИ ОБРАТНО?',
        a: 'После получения и проверки товара — в течение 3 рабочих дней. Возврат на карту или наличными — по договорённости.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-zinc-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between py-5 text-left gap-6 cursor-pointer"
      >
        <span className="text-[11px] tracking-widest uppercase text-zinc-700 leading-relaxed">{q}</span>
        <span className="text-zinc-400 text-lg leading-none shrink-0 mt-0.5">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-6 text-sm text-zinc-500 leading-relaxed max-w-2xl">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 md:py-16">

      <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-start">

        {/* Sidebar nav — sticky anchors */}
        <div className="hidden md:block sticky top-14 self-start max-h-[calc(100vh-56px)] overflow-y-auto pt-10 w-40 shrink-0">
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-5">Навигация</p>
          <ul className="space-y-2">
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block text-lg leading-tight transition-colors ${activeSection === s.id ? 'text-zinc-900 font-semibold' : 'text-zinc-300 hover:text-zinc-600'}`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden overflow-x-auto pb-1">
          <ul className="flex gap-4">
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="whitespace-nowrap text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* All sections always visible */}
        <div className="flex-1 min-w-0 space-y-14">
          {SECTIONS.map(section => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-2">
                {section.title}
              </h2>
              <div className="border-b border-zinc-200">
                {section.items.map(item => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}

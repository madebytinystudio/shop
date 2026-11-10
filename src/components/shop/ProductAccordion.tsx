'use client'

import { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-zinc-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      >
        <span className="text-[11px] tracking-widest uppercase text-zinc-700">{title}</span>
        <span className="text-zinc-400 text-sm leading-none ml-4 shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-sm text-zinc-500 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

interface Spec {
  key: string
  value: string
}

interface ProductAccordionProps {
  specs: Spec[]
  description?: string | null
}

export default function ProductAccordion({ specs, description }: ProductAccordionProps) {
  return (
    <div className="border-b border-zinc-200">
      {description && (
        <AccordionItem title="Описание">
          <p className="whitespace-pre-line">{description}</p>
        </AccordionItem>
      )}
      {specs.length > 0 && (
        <AccordionItem title="Характеристики">
          <dl className="space-y-2.5">
            {specs.map(({ key, value }) => (
              <div key={key} className="flex gap-4">
                <dt className="text-zinc-400 text-xs uppercase tracking-wide w-28 shrink-0">{key}</dt>
                <dd className="text-zinc-600">{value}</dd>
              </div>
            ))}
          </dl>
        </AccordionItem>
      )}
      <AccordionItem title="Доставка и оплата">
        <p>Доставка по Алматы — 1 500 ₸, курьером 1–2 дня.</p>
        <p className="mt-1">По Казахстану — СДЭК или Казпочта, 3–7 дней, от 2 000 ₸.</p>
        <p className="mt-1">Оплата: Kaspi Gold, наличными, перевод на карту.</p>
      </AccordionItem>
      <AccordionItem title="Возврат">
        <p>Принимаем возврат в течение 14 дней. Товар должен быть в оригинальной упаковке, без следов использования.</p>
        <p className="mt-1">Для оформления возврата напишите в WhatsApp.</p>
      </AccordionItem>
    </div>
  )
}

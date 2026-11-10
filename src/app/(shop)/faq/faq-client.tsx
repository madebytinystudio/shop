'use client'

import { useState, useEffect } from 'react'
import type { FaqSection } from '@/lib/actions/faq'

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-zinc-200">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between py-5 text-left gap-6 cursor-pointer">
        <span className="text-[11px] tracking-widest uppercase text-zinc-700 leading-relaxed">{q}</span>
        <span className="text-zinc-400 text-lg leading-none shrink-0 mt-0.5">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pb-6 text-sm text-zinc-500 leading-relaxed max-w-2xl">{a}</div>}
    </div>
  )
}

export default function FaqClient({ sections }: { sections: FaqSection[] }) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-start">

        <div className="hidden md:block sticky top-14 self-start max-h-[calc(100vh-56px)] overflow-y-auto pt-10 w-40 shrink-0">
          <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-5">Навигация</p>
          <ul className="space-y-2">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`block text-lg leading-tight transition-colors ${activeSection === s.id ? 'text-zinc-900 font-semibold' : 'text-zinc-300 hover:text-zinc-600'}`}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden overflow-x-auto pb-1">
          <ul className="flex gap-4">
            {sections.map(s => (
              <li key={s.id}><a href={`#${s.id}`} className="whitespace-nowrap text-sm text-zinc-500 hover:text-zinc-900 transition-colors">{s.title}</a></li>
            ))}
          </ul>
        </div>

        <div className="flex-1 min-w-0 space-y-14">
          {sections.map(section => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-2">{section.title}</h2>
              <div className="border-b border-zinc-200">
                {section.faq_items.map(item => (
                  <AccordionItem key={item.id} q={item.question} a={item.answer} />
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}

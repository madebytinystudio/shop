import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: { default: 'Магазин', template: '%s | Магазин' },
  description: 'Современный интернет-магазин',
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-white text-zinc-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}

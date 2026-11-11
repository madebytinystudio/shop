import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: { default: 'WE OPEN ON SNOWY DAYS', template: '%s | WE OPEN ON SNOWY DAYS' },
  description: 'WE OPEN ON SNOWY DAYS — интернет-магазин',
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

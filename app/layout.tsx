import type { Metadata, Viewport } from 'next'
import { Lora, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://taras-bulba.itkamianets.com'),
  title: 'Тарас Бульба - Готельний комплекс у Кам\'янці-Подільському',
  description:
    'Дух козацтва у серці старого міста. Готельний комплекс «Тарас Бульба» поєднує глибоку повагу до української історії з високими стандартами сучасного сервісу.',
  keywords: [
    'Тарас Бульба',
    'готель Кам\'янець-Подільський',
    'готельний комплекс',
    'відпочинок Кам\'янець-Подільський',
    'ресторан Кам\'янець',
    'СПА Кам\'янець',
    'де зупинитися Кам\'янець',
    'номери Кам\'янець-Подільський',
    'Taras Bulba hotel',
    'Kamianets-Podilskyi hotel',
  ],
  authors: [{ name: 'IT Kamianets' }],
  creator: 'IT Kamianets',
  openGraph: {
    type: 'website',
    title: 'Тарас Бульба - Готельний комплекс у Кам\'янці-Подільському',
    description:
      'Дух козацтва у серці старого міста. 48 номерів, концептуальний ресторан, сучасний СПА-центр.',
    siteName: 'Тарас Бульба',
    locale: 'uk_UA',
    images: [
      {
        url: '/logo/logo.png',
        width: 512,
        height: 512,
        alt: 'Тарас Бульба',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Тарас Бульба - Готельний комплекс у Кам\'янці-Подільському',
    description:
      'Дух козацтва у серці старого міста. 48 номерів, концептуальний ресторан, сучасний СПА-центр.',
    images: ['/logo/logo.png'],
  },
  icons: {
    icon: '/logo/fvicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1510',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body
        className={`${lora.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}

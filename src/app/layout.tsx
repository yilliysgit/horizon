// ./src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Kanit, Inter } from 'next/font/google'
import Header from './components/layout/header/Header'

export const metadata: Metadata = {
  title: 'Horizontotaalbouw',
  description: 'Bouw & renovatie — vrijblijvend advies en offerte.',
}

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300','400','600','700'],         // << kies de gewichten die je gebruikt
  // style: ['normal', 'italic'],  // << alleen nodig als je italic gebruikt
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  // Inter is wel variable; weight mag je hier weglaten, of specificeer bv.:
  // weight: ['400', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${kanit.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

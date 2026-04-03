import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import '@/styles/variables.css'
import Header from '@/components/layout/Header'
import Tabs from '@/components/layout/Tabs'
import StoreInitializer from '@/components/layout/StoreInitializer'
import ToastContainer from '@/components/ui/Toast'
import styles from './layout.module.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Event Manager',
  description: 'Управление мероприятиями: конференции, вебинары, встречи',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={onest.variable}>
      <body className={styles.body}>
        <StoreInitializer />
        <Header />
        <Tabs />
        <main className={styles.main}>{children}</main>
        <ToastContainer />
      </body>
    </html>
  )
}

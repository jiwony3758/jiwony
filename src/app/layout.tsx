import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JIWONY',
  description: '지원',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <Link href=""><Image
              src="/JIWONY.svg"
              alt="Jiwony Logo"
              width={95}
              height={32}
              priority
            /></Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}

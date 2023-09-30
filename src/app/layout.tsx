import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zoni',
  description: '지오니 사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <Link href="">
              <Image
                src="/Zoni.svg"
                alt="Zoni Logo"
                width={57}
                height={32}
                priority
              />
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

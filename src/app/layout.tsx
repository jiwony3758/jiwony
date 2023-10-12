import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";

const inter = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiwony",
  description: "Jiwony Web Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header>
          <nav>
            <Link
              href="/"
              style={{
                fontFamily: "PyeongChangPeace-Bold",
              }}
            >
              Jiwony
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

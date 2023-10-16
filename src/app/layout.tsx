import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import metadata from "../../config/metadata";

const inter = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...metadata,
  };
}

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

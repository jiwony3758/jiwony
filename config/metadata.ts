import { Metadata } from "next";

const TITLE = "Jiwony";
const DEVELOPER = "jiwony";

const metadata: Metadata = {
  creator: DEVELOPER,
  authors: { name: DEVELOPER },
  title: TITLE,
  applicationName: "Jiwony",
  description: "지원이의 개인 사이트",
  metadataBase: new URL("https://jiwony.dev"),
  keywords: ["블로그", "개발자", "청년", "공부", "자기계발"],
  viewport: "width=device-width, initial-scale=1",
  publisher: DEVELOPER,
  robots: "index, follow",
  icons: [
    {
      url: "/favicon.ico",
    },
    {
      url: "/LEEJIWON-16.png",
      sizes: "16px",
    },
    {
      url: "/LEEJIWON-32.png",
      sizes: "32px",
    },
    {
      rel: "apple-touch-icon",
      url: "/LEEJIWON-76.png",
      sizes: "76px",
    },
  ],
  openGraph: {
    title: TITLE,
    description: "지원이의 개인 사이트",
    type: "website",
  },
};

export default metadata;

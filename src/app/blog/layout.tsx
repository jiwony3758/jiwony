import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zoni",
  description: "지오니 블로그",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}

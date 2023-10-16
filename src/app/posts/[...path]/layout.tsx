import di from "@/di";
import { Metadata } from "next";

type MetadataProps = {
  params: { path: string[] };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { path } = params;
  const { metadata } = await di.post.getPostDataByRoutingPath(path);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags.split(","),
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article>{children}</article>;
}

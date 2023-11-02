import di from "@/di";
import { Metadata } from "next";
import metadata from "../../../../config/metadata";

type MetadataProps = {
  params: { path: string[] };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { path } = params;
  const { title, description, tags } = await di.post.getPostDataFromNotion(
    path[path.length - 1]
  );
  const stringPath = path.toString().replaceAll(",", "/");
  return {
    title: title,
    description: description,
    keywords: tags,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: `${metadata.metadataBase}${stringPath}`,
    },
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article>{children}</article>;
}

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
  const { metadata: postMetadata } = await di.post.getPostDataByRoutingPath(path);
  const stringPath = path.toString().replaceAll(",", "/");
  return {
    title: postMetadata.title,
    description: postMetadata.description,
    keywords: postMetadata.tags.split(","),
    openGraph: {
      title: postMetadata.title,
      description: postMetadata.description,
      type: "website",
      url: `${metadata.metadataBase}${stringPath}`
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

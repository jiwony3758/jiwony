import { Metadata } from "next";

type MetadataProps = {
  params: { path: string[] };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { path } = params;
  const id = path[path.length - 1];

  return {
    title: decodeURI(id),
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article>{children}</article>;
}

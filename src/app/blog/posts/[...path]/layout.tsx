import { Metadata, ResolvingMetadata } from "next"


type Props = {
  params: { path: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { path } = params;
  const id = path[path.length - 1];

  return {
    title: decodeURI(id),
  }
};


export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}){
  return(
    <article>
      {children}
    </article>
  )
}
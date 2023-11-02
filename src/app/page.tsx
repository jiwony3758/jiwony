import { IPostEntity } from "@/domain/entities/Post";
import di from "@/di";
import { PostList } from "./components/PostList";

export default async function Home() {
  const posts: IPostEntity[] = await di.post.getAllSortedNotionData();

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <section className="flex flex-col gap-8 px-3 items-center">
        <PostList posts={posts} />
      </section>
    </div>
  );
}

import { IPostEntity } from "@/domain/entities/Post";
import di from "@/di";
import { PostVM } from "@/vm/Post";
import { PostList } from "./components/PostList";
import { SearchBar } from "./components/SearchBar";
import TagCollection from "./components/TagCollection";

export default async function Home() {
  const posts: IPostEntity[] = await di.post.getAllSortedPostData();
  const postVMList = posts.map((post) => new PostVM(post));

  const postTags = posts.map(post => post.metadata.tags);
  const tags = postTags.toString().split(",");
  return (
    <div className="relative mx-auto max-w-screen-xl px-4 md:flex md:flex-row">
      <aside className="hidden sticky top-[121px] h-[calc(100vh-121px)] md:flex md:flex-col w-[284px] p-2">
        <TagCollection tags={tags}/>
      </aside>
      <section className="flex flex-col gap-8 px-3">
        <SearchBar />
        <PostList posts={postVMList} />
      </section>
    </div>
  );
}
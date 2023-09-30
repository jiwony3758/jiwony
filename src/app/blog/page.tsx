import { http } from "@/adapter/infrastructure/http";
import PostItem from "@/components/blog/PostItem";
import { PostListResponseType } from "@/types/post";

export default async function Blog() {
  const { posts }: PostListResponseType = await http.request({
    url: "http://localhost:3000/api/blog/posts",
    method: "GET",
    next: {
      revalidate: 5
    }
  });

  // console.log(postsResponse);

  return <ul className="post-list">
  {posts.map(({
    id, title, description, date, tags
  }) => (
      <PostItem 
          key={id} 
          date={date}
          title={title}
          description={description}
          tags={tags}
      />
  ))}
</ul>;
}

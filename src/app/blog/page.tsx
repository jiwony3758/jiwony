import { http } from "@/adapter/infrastructure/http";
import DateView from "@/components/DateView";
import { PostListResponseType } from "@/types/post";
import "./style.css";
import Link from "next/link";

export default async function Blog() {
  const { posts }: PostListResponseType = await http.request({
    url: "http://localhost:3000/api/blog/posts",
    method: "GET",
    next: {
      revalidate: 5
    }
  });
  console.log(posts);

  const convertCategoryPath = (category: string) => {
    return category.replaceAll(",", "/") + "/";
  }
  return <ul className="post-list">
    {posts.map(({
      id, title, description, date, category="", tags
    }) => (
      <li className="post-item" key={id}>
        <Link href={`/blog/posts/${category.length > 0 ? convertCategoryPath(category) : ""}${id}`}>
          <div className="post-header">
            {tags && tags.length > 0 ?
              <span className="tag-list">
                {tags.map((tag, index) => <span className="tag" key={index}>{tag}</span>)}
              </span>
              : <></>
            }
            <DateView dateString={date} />
          </div>
          <span className="post-title">{title}</span>
          <span className="post-description">{description}</span>
        </Link>
      </li>
    ))}</ul>
}

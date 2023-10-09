import DateView from "@/components/DateView";
import { PostMetaDataType } from "@/types/post";
import "./style.css";
import Link from "next/link";
import { getSortedPostsData } from "@/libraries/post";

export default async function Blog() {
  const posts: PostMetaDataType[] = getSortedPostsData();

  const convertCategoryPath = (category: string) => {
    return category.replaceAll(",", "/") + "/";
  }
  return <ul className="post-list">
    {posts.map(({
      id, title, description, date, category="", tags
    }) => (
      <li className="post-item" key={id}>
        <Link href={`/blog/posts/${category.length > 0 ? convertCategoryPath(category) : ""}${id}`}>
          <p className="post-item-header">
            {tags && tags.length > 0 ?
              <span className="tag-list">
                {tags.map((tag, index) => <span className="tag" key={index}>{tag}</span>)}
              </span>
              : <></>
            }
            <DateView dateString={date} />
          </p>
          <h3 className="post-item-title">{title}</h3>
          <span className="post-item-description">{description}</span>
        </Link>
      </li>
    ))}</ul>
}

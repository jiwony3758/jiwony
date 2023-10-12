import { getSortedPostsData } from "@/libraries/post";
import { PostMetaDataType } from "@/types/post";
import Link from "next/link";
import DateView from "./components/DateView";
import postStyles from "@/app/styles/post.module.css";
import tagStyles from "@/app/styles/tag.module.css";


export default function Home() {
  const posts: PostMetaDataType[] = getSortedPostsData();

  const convertCategoryPath = (category: string) => {
    return category.replaceAll(",", "/") + "/";
  }

  
  return <ul className={postStyles["list"]}>
    {posts.map(({
      id, title, description, date, category="", tags
    }) => (
      <li className={postStyles["item"]} key={id}>
        <Link href={`/posts/${category.length > 0 ? convertCategoryPath(category) : ""}${id}`}>
          <p className={postStyles["item-header"]}>
            {tags && tags.length > 0 ?
              <span className={tagStyles["list"]}>
                {tags.map((tag, index) => <span className={tagStyles["item"]} key={index}>{tag}</span>)}
              </span>
              : <></>
            }
            <DateView dateString={date} />
          </p>
          <h3 className={postStyles["item-title"]}>{title}</h3>
          <span className={postStyles["item-description"]}>{description}</span>
        </Link>
      </li>
    ))}</ul>
}

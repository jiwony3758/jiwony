import { IPostVM } from "@/vm/Post"
import postStyles from "../styles/post.module.css";
import DateView from "./DateView";
import Link from "next/link";
import TagItem from "./TagItem";

type PostListProps = IPostVM[];

export const PostList = ({ posts }: { posts: PostListProps }) => {
  return (
    <ul className={`${postStyles["list"]} p-0`}>
      {posts.map(({ id, title, description, date, category, tags }) => (
        <li className={`${postStyles["item"]} list-none`} key={id}>
          <Link href={`/posts/${category}${id}`}>
            <p className={postStyles["item-header"]}>
              {tags && tags.length > 0 ? (
                <span className="flex gap-2 flex-wrap">
                  {tags.map((tag, index) => (
                    <TagItem key={index} tagName={tag}/>
                  ))}
                </span>
              ) : (
                <></>
              )}
              <DateView dateString={date} />
            </p>
            <h3 className={postStyles["item-title"]}>{title}</h3>
            <span className={postStyles["item-description"]}>
              {description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
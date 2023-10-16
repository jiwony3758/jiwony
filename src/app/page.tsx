import Link from "next/link";
import DateView from "./components/DateView";
import postStyles from "@/app/styles/post.module.css";
import tagStyles from "@/app/styles/tag.module.css";
import { IPostEntity } from "@/domain/entities/Post";
import di from "@/di";
import { PostVM } from "@/vm/Post";

export default async function Home() {
  const posts: IPostEntity[] = await di.post.getAllSortedPostData();
  const postVMList = posts.map((post) => new PostVM(post));

  return (
    <ul className={postStyles["list"]}>
      {postVMList.map(({ id, title, description, date, category, tags }) => (
        <li className={postStyles["item"]} key={id}>
          <Link href={`/posts/${category}${id}`}>
            <p className={postStyles["item-header"]}>
              {tags && tags.length > 0 ? (
                <span className={tagStyles["list"]}>
                  {tags.map((tag, index) => (
                    <span className={tagStyles["item"]} key={index}>
                      {tag}
                    </span>
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
  );
}

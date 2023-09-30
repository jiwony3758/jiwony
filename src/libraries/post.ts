import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaDataLegacyType, PostMetaDataType } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: PostMetaDataType[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const postContent = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(postContent);
    const { data: postMetaData } = matterResult;

    const {
      title,
      date,
      description,
      tags: stringTags,
    } = postMetaData as PostMetaDataLegacyType;

    return {
      id,
      title,
      date,
      description,
      tags: stringTags.split(","),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

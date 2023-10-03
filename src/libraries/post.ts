import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaDataLegacyType, PostMetaDataType } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export const findFilePaths = (directory: string, fileNameExtension: string) => {
  const results: string[] = [];

  const searchFile = (dir: string) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);

      if(fileStat.isDirectory()){
        searchFile(filePath);
      }else if(file.endsWith(fileNameExtension)) {
        results.push(filePath);
      }
    }
  }

  searchFile(postsDirectory);
  return results;
}
 
export const getSortedPostsData = () => {
  const files = findFilePaths(postsDirectory, ".md");


  const allPostsData: PostMetaDataType[] = files.map((file) => {
    const pathArray = file.split("/");
    const filename = pathArray[pathArray.length - 1];
    const id = filename.replace(/\.md$/, "");

    const postContent = fs.readFileSync(file, "utf-8");

    const matterResult = matter(postContent);
    const { data: postMetaData } = matterResult;

    const {
      title,
      date,
      description,
      category,
      tags: stringTags,
    } = postMetaData as PostMetaDataLegacyType;

    return {
      id,
      title,
      date,
      category,
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

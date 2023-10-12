import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaDataLegacyType, PostMetaDataType } from "@/types/post";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

type FileInfo = {
  matterResult: matter.GrayMatterFile<string>;
  isMdFile: boolean;
};

type PostData = {
  id: string;
  contentHtml: string;
  [key: string]: unknown;
};

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export const findFilePaths = (directory: string, fileNameExtension: string) => {
  const results: string[] = [];

  const searchFile = (dir: string) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        searchFile(filePath);
      } else if (file.endsWith(fileNameExtension)) {
        const relativePath = path.relative(directory, filePath);
        results.push(relativePath);
      }
    }
  };

  searchFile(directory);
  return results;
};

export const getSortedPostsData = () => {
  const mdFiles = findFilePaths(postsDirectory, ".md");
  const mdxFiles = findFilePaths(postsDirectory, ".mdx");

  const files = [...mdFiles, ...mdxFiles];

  const allPostsData: PostMetaDataType[] = files.map((file) => {
    const fullPath = path.join(postsDirectory, file);
    const fullPathSplitArray = fullPath.split("/");

    const filename = fullPathSplitArray[fullPathSplitArray.length - 1];
    const id = filename.replace(/\.md$|\.mdx$/, "");

    const postContent = fs.readFileSync(fullPath, "utf-8");

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

export function getAllPostPaths() {
  const mdFiles = findFilePaths(postsDirectory, ".md");
  const mdxFiles = findFilePaths(postsDirectory, ".mdx");

  const files = [...mdFiles, ...mdxFiles];

  return files.map((file) => {
    const arrayPath = file.split("/");
    arrayPath[arrayPath.length - 1] = arrayPath[arrayPath.length - 1].replace(
      /\.md$|\.mdx$/,
      ""
    );
    return {
      params: {
        path: arrayPath,
      },
    };
  });
}

export const getAllPostPathStrings = () => {
  const mdFiles = findFilePaths(postsDirectory, ".md");
  const mdxFiles = findFilePaths(postsDirectory, ".mdx");

  const files = [...mdFiles, ...mdxFiles];

  return files.map((file) => {
    // const arrayPath = file.split("/");
    const path = file.replace(/\.md$|\.mdx$/, "");
    return path;
  });
};

const getFileInfo = (id: string, category: string[]): FileInfo => {
  const fullMdPath = path.join(postsDirectory, ...category, `${id}.md`);
  const mdExist = fs.existsSync(fullMdPath);

  const existFilePath = mdExist
    ? fullMdPath
    : path.join(postsDirectory, ...category, `${id}.mdx`);
  const fileContents = fs.readFileSync(existFilePath, "utf8");

  const matterResult = matter(fileContents);

  return {
    isMdFile: mdExist,
    matterResult,
  };
};

export const getPostData = async (
  id: string,
  category: string[]
): Promise<PostData> => {
  const { matterResult } = getFileInfo(id, category);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      grid: true,
      defaultLang: "js",
      theme: "dark-plus",
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

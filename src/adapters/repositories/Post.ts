import { IPostFileInfo, IPostPath, IPostRepository } from "@/domain/useCases/repository-interfaces/Post";
import {
  IFileHandler,
} from "../infrastructures/FileHandler";
import { Content, PostMetadata } from "@/domain/entities/Post";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import path from "path";

export class PostRepository implements IPostRepository {
  constructor(
    private readonly directory: string,
    readonly fileHandler: IFileHandler
  ) {}

  async getPostFiles(): Promise<IPostPath[]> {
    const mdFiles = await this.fileHandler.findFiles(this.directory, "md");
    const mdxFiles = await this.fileHandler.findFiles(this.directory, "mdx");
    const rootPathFiles = [...mdFiles, ...mdxFiles];

    return rootPathFiles.map( rootPath => ({
      rootPath,
      relativePath: path.relative(this.directory, rootPath),
    }));
  }

  async getPostIds(): Promise<string[]> {
    const files = await this.getPostFiles();

    return await Promise.all(
      files.map((file) => {
        const pathArray = file.relativePath.split("/");

        const fileName = pathArray[pathArray.length - 1];
        const id = fileName.replace(/\.md$|\.mdx$/, "");

        return id;
      })
    );
  }

  getPostFileInfo(id: string, category: string[]): IPostFileInfo {
    const result: IPostFileInfo = {
      extension: "md",  
      path: {
        rootPath: "",
        relativePath: "",
      },
    };
    const fullMdFilePath = path.join(this.directory, ...category, `${id}.md`);
    const mdExist = this.fileHandler.exists(fullMdFilePath);
    if (mdExist) {
      result.path.rootPath = fullMdFilePath;
      result.path.relativePath = path.join(...category, fullMdFilePath);
    } else {
      result.extension = "mdx";
      result.path.rootPath = path.join(
        this.directory,
        ...category,
        `${id}.mdx`
      );
      result.path.relativePath = path.join(...category, `${id}.mdx`);
    }
    return result;
  }

  getPostId(rootPath: string): string {
    const pathArray = rootPath.split("/");

    const fileName = pathArray[pathArray.length - 1];
    const id = fileName.replace(/\.md$|\.mdx$/, "");

    return id;
  }

  async getPostMetadata(rootPath: string): Promise<PostMetadata> {
    const postData = await this.fileHandler.readFile(rootPath, {
      encoding: "utf-8",
    });
    const matterResult = matter(postData);
    const { data: postMetadata } = matterResult;
    return {
      ...(postMetadata as PostMetadata),
    };
  }



  async getPostContent(rootPath: string): Promise<Content> {
    const fileData = await this.fileHandler.readFile(rootPath, {
      encoding: "utf-8",
    });
    const { content } = this.fileHandler.convertFrontMatterToObject(
      fileData as string
    );
    const fileInfo = this.fileHandler.getFileInfo(rootPath);
    if(fileInfo.extension === "md") {
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
      .process(content);

      const contentHtml = processedContent.toString();
      return {
        htmlContent: contentHtml,
      }
    }else {
      return {
        mdxSource: content,
      }
    }
  }
}

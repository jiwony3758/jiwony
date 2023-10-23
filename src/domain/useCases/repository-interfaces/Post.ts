import { Content, PostMetadata } from "@/domain/entities/Post";

export interface IPostPath {
  rootPath: string;
  relativePath: string;
}

export interface IPostFileInfo {
  extension: string;
  path: IPostPath;
}

export interface IPostRepository {
  getPostFiles(): Promise<IPostPath[]>;
  getPostId(rootPath: string): string;
  getPostIds(): Promise<string[]>;
  getPostFileInfo(id: string, category: string[]): IPostFileInfo;
  getPostMetadata(rootPath: string): Promise<PostMetadata>;
  getPostContent(rootPath: string): Promise<Content>;
}

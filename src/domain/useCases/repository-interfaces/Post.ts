import { IFilePath } from "@/adapters/infrastructures/FileHandler"
import { PostMetadata } from "@/domain/entities/Post"

export interface IPostRepository {
  getPostFiles(): Promise<IFilePath[]>
  getPostId(rootPath: string): string
  getPostIds(): Promise<string[]>
  getPostMetadata(rootPath: string): Promise<PostMetadata>
  getPostContent(rootPath: string): Promise<string>
}
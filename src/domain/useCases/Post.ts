import { IPostEntity } from "../entities/Post";
import { IPostRepository } from "./repository-interfaces/Post";
import { IFilePath } from "@/adapters/infrastructures/FileHandler";


export class PostUseCase {
  constructor(
    private readonly postRepository: IPostRepository
  ) {}

  async getPostFiles(): Promise<IFilePath[]> {
    return await this.postRepository.getPostFiles();
  }

  async getPostIds(): Promise<string[]> {
    return await this.postRepository.getPostIds();
  }

  async getPostData(rootPath: string): Promise<IPostEntity> {
    const id = this.postRepository.getPostId(rootPath);
    const promiseMetadata = this.postRepository.getPostMetadata(rootPath);
    const promiseContent = this.postRepository.getPostContent(rootPath);
    const [metadata, content] = await Promise.all([promiseMetadata, promiseContent]);

    return {
      id,
      metadata,
      content
    }
  }

  async getAllSortedPostData(): Promise<IPostEntity[]> {
    const files = await this.postRepository.getPostFiles(); 
    const allPostData = await Promise.all(files.map(async file => {
      return this.getPostData(file.rootPath);
    }));

    return allPostData.sort((a, b) => {
      if(a.metadata.date < b.metadata.date) {
        return 1;
      }else {
        return -1;
      }
    })
  }
}
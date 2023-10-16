import { IPostEntity } from "../entities/Post";
import { IPostRepository } from "./repository-interfaces/Post";
import { IFilePath } from "@/adapters/infrastructures/FileHandler";

export class PostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async getPostFiles(): Promise<IFilePath[]> {
    return await this.postRepository.getPostFiles();
  }

  async getPostIds(): Promise<string[]> {
    return await this.postRepository.getPostIds();
  }

  async getPostDataByRootPath(rootPath: string): Promise<IPostEntity> {
    const id = this.postRepository.getPostId(rootPath);

    const promiseMetadata = this.postRepository.getPostMetadata(rootPath);
    const promiseContent = this.postRepository.getPostContent(rootPath);
    const [metadata, content] = await Promise.all([
      promiseMetadata,
      promiseContent,
    ]);

    return {
      id,
      metadata,
      content,
    };
  }

  async getPostDataByIdAndCategory(
    id: string,
    category: string[]
  ): Promise<IPostEntity> {
    const {
      filePath: { rootPath },
    } = this.postRepository.getPostFileInfo(id, category);

    const promiseMetadata = this.postRepository.getPostMetadata(rootPath);
    const promiseContent = this.postRepository.getPostContent(rootPath);
    const [metadata, content] = await Promise.all([
      promiseMetadata,
      promiseContent,
    ]);

    return {
      id,
      metadata,
      content,
    };
  }

  async getAllPostData(): Promise<IPostEntity[]> {
    const files = await this.postRepository.getPostFiles();
    return await Promise.all(
      files.map(async (file) => {
        return await this.getPostDataByRootPath(file.rootPath);
      })
    );
  }
}

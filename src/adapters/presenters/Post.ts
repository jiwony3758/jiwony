import { IPostEntity, IPostProperties } from "@/domain/entities/Post";
import { PostUseCase } from "@/domain/useCases/Post";
import { ICreatePostVM } from "@/vm/Post";

export class PostPresenter {
  constructor(private readonly postUseCase: PostUseCase) {}

  async writePost(params: ICreatePostVM): Promise<void> {
    await this.postUseCase.writePost({
      ...params,
      tags: params.tags.split(","),
    });
  }

  async getPostDataFromNotion(contentId: string): Promise<IPostEntity> {
    return await this.postUseCase.getPostDataByContentId(contentId);
  }

  async getAllSortedNotionData(): Promise<IPostEntity[]> {
    const allPostData = await this.postUseCase.getPosts();
    return allPostData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  async getPostsProperties(): Promise<IPostProperties[]> {
    return await this.postUseCase.getPostsProperties();
  }

  async getPostContentByContentId(contentId: string): Promise<string> {
    return await this.postUseCase.getPostContentByContentId(contentId);
  }
}

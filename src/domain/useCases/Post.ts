import { IPostEntity, IPostProperties } from "../entities/Post";
import { IPostRepository } from "./repository-interfaces/Post";
import { ICreatePostDTO } from "../dtos/Post";

export class PostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async getPostsProperties(): Promise<IPostProperties[]> {
    return await this.postRepository.getPostsProperties();
  }

  async getPosts(): Promise<IPostEntity[]> {
    const postsInfo = await this.postRepository.getPostsInfo();

    return await Promise.all(
      postsInfo.map(async (postInfo) => {
        const content = await this.postRepository.getPostContentByPageId({
          pageId: postInfo.pageId,
          form: postInfo.form,
        });
        return {
          contentId: postInfo.contentId,
          pageId: postInfo.pageId,
          title: postInfo.title,
          description: postInfo.description,
          category: postInfo.category,
          date: postInfo.date,
          tags: [...postInfo.tags],
          form: postInfo.form,
          visible: postInfo.visible === "true" ? true : false,
          content,
        };
      })
    );
  }

  async getPostDataByContentId(contentId: string): Promise<IPostEntity> {
    const postDTO = await this.postRepository.getPostInfoByContentId(contentId);
    const content = await this.postRepository.getPostContentByContentId({
      contentId,
      form: postDTO.form,
    });
    return {
      ...postDTO,
      visible: postDTO.visible === "true" ? true : false,
      content,
    };
  }

  async getPostContentByContentId(contentId: string): Promise<string> {
    const properties =
      await this.postRepository.getPostPropertiesByContentId(contentId);
    return await this.postRepository.getPostContentByContentId({
      contentId,
      form: properties.form,
    });
  }

  async writePost(params: ICreatePostDTO): Promise<void> {
    await this.postRepository.writePost(params);
  }
}

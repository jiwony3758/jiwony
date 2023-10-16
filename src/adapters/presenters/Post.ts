import { IPostEntity } from "@/domain/entities/Post";
import { PostUseCase } from "@/domain/useCases/Post";
import { IFilePath } from "../infrastructures/FileHandler";

export class PostPresenter {
  constructor(private readonly postUseCase: PostUseCase) {}

  async getAllSortedPostData(): Promise<IPostEntity[]> {
    const allPostData = await this.postUseCase.getAllPostData();
    return allPostData.sort((a, b) => {
      if (a.metadata.date < b.metadata.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  async getPostDataByRoutingPath(routingPath: string[]): Promise<IPostEntity> {
    let id: string = "";
    const category: string[] = [];

    if (routingPath.length <= 1) {
      id = routingPath[0];
    } else {
      id = routingPath[routingPath.length - 1];
      category.push(...routingPath.slice(0, routingPath.length - 1));
    }

    return await this.postUseCase.getPostDataByIdAndCategory(id, category);
  }

  async getPostRoutingPath(): Promise<{ params: { routingPath: string[] } }[]> {
    const files = await this.postUseCase.getPostFiles();
    return files.map((file) => {
      const arrayPath = file.relativePath.split("/");
      arrayPath[arrayPath.length - 1] = arrayPath[arrayPath.length - 1].replace(
        /\.md$|\.mdx$/,
        ""
      );
      return {
        params: {
          routingPath: arrayPath,
        },
      };
    });
  }

  async getPostFiles(): Promise<IFilePath[]> {
    return await this.postUseCase.getPostFiles();
  }
}

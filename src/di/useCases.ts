import { PostUseCase } from "@/domain/useCases/Post";
import { IRepositories } from "./repositories";

export interface IUseCases {
  postUseCase: PostUseCase;
}

export default (repositories: IRepositories): IUseCases => ({
  postUseCase: new PostUseCase(repositories.postRepository),
});

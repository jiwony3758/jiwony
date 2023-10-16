import { PostPresenter } from "@/adapters/presenters/Post";
import { IUseCases } from "./useCases";

export interface IPresenters {
  postPresenter: PostPresenter;
}

export default (useCases: IUseCases): IPresenters => ({
  postPresenter: new PostPresenter(useCases.postUseCase),
});

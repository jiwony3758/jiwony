import {
  ICreatePostDTO,
  IPostContentByContentIdRequestDTO,
  IPostContentByPageIdRequestDTO,
  IPostDTO,
} from "@/domain/dtos/Post";
import { IPostProperties } from "@/domain/entities/Post";

export interface IPostPath {
  rootPath: string;
  relativePath: string;
}

export interface IPostFileInfo {
  extension: string;
  path: IPostPath;
}

export interface IPostRepository {
  writePost(params: ICreatePostDTO): Promise<void>;

  getPostsProperties(): Promise<IPostProperties[]>;
  getPostsInfo(): Promise<IPostDTO[]>;
  getPostInfoByContentId(contentId: string): Promise<IPostDTO>;

  getPostPropertiesByContentId(contentId: string): Promise<IPostProperties>;
  getPostContentByPageId(
    params: IPostContentByPageIdRequestDTO
  ): Promise<string>;
  getPostContentByContentId(
    params: IPostContentByContentIdRequestDTO
  ): Promise<string>;
}

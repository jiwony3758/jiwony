import { PostRepository } from "@/adapters/repositories/Post";
import path from "path";
import { IInfrastructures } from "./infrastructures";

const postDirectory = path.join(process.cwd(), "src/contents/posts");
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export interface IRepositories {
  postRepository: PostRepository;
}

export default (infrastructures: IInfrastructures): IRepositories => ({
  postRepository: new PostRepository(
    NOTION_DATABASE_ID as string,
    postDirectory,
    infrastructures.fileHandler,
    infrastructures.notionClient
  ),
});

import { PostRepository } from "@/adapters/repositories/Post"
import path from "path"
import { IInfrastructures } from "./infrastructures";

const postDirectory = path.join(process.cwd(), "src/content/posts");

export interface IRepositories {
  postRepository: PostRepository
}

export default (infrastructures: IInfrastructures): IRepositories => ({
  postRepository: new PostRepository(postDirectory, infrastructures.fileHandler)
})
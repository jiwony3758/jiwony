import { IPostEntity, IPostProperties } from "@/domain/entities/Post";

export interface IPostVM {
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  form: string;
}

export interface ICreatePostVM {
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string;
  content: string;
  form: string;
}

export class PostVM {
  static propertiesToSitemapPath(postInfo: IPostProperties) {
    return `posts/${postInfo.category}/${postInfo.contentId}`;
  }

  static entityToVM(params: IPostEntity): IPostVM {
    return {
      contentId: params.contentId,
      title: params.title,
      description: params.description,
      date: params.date,
      category: params.category,
      tags: [...params.tags],
      form: params.form,
      content: params.content,
    };
  }
}

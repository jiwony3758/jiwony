export type ContentData = {
  mdxSource?: string;
  htmlContent?: string;
}

export type Content = (
  { mdxSource: string } | 
  { htmlContent: string }
) & ContentData;

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string;
}

export interface IPostParams {
  path: string;
  metadata: PostMetadata;
  content: Content;
}

export interface IPostEntity {
  id: string;
  metadata: PostMetadata;
  content: Content;
}

export class Post implements IPostEntity {
  _id: string;
  _metadata: PostMetadata;
  _content: Content;

  constructor(params: IPostParams) {
    const { path, metadata, content } = params;
    const arrayPath = path.split("/");
    this._id = arrayPath[arrayPath.length - 1].replaceAll(/\.md$|\.mdx$/, "");
    this._metadata = Object.assign({ metadata });
    this._content = content;
  }

  get id(): string {
    return this._id;
  }

  get metadata(): PostMetadata {
    return this._metadata;
  }

  get content(): Content {
    return this._content;
  }
}

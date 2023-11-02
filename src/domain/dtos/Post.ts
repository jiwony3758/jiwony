export interface IPostDTO {
  pageId: string;
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  visible: string;
  form: string;
}

export interface IPostContentByPageIdRequestDTO {
  pageId: string;
  form: string;
}

export interface IPostContentByContentIdRequestDTO {
  contentId: string;
  form: string;
}

export interface ICreatePostDTO {
  contentId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  form: string;
}

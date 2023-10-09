export type PostMetaDataLegacyType = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string;
};

export type PostMetaDataType = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
};

export type PostListResponseType = {
  posts: (PostMetaDataType & {
    id: string;
  })[];
};

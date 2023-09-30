export type PostMetaDataLegacyType = {
  title: string;
  description: string;
  date: string;
  tags: string;
};

export type PostMetaDataType = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type PostListResponseType = {
  posts: (PostMetaDataType & {
    id: string;
  })[];
};

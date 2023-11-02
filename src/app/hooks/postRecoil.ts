import { IPostEntity } from "@/domain/entities/Post";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const postList = atom<IPostEntity[]>({
  key: "post",
  default: [],
});

const postListState = selector({
  key: "postListState",
  get: ({ get }) => get(postList),
});

export const useGetPostList = () => {
  return useRecoilValue(postListState);
};

export const useSetPostList = () => {
  return useSetRecoilState(postList);
};

export const usePostListState = () => {
  return useRecoilState(postList);
};

const filterPostListState = selector({
  key: "filterPostListState",
  get: ({ get }) => {
    const posts = get(postList);
    return posts.filter((post) => post.visible);
  },
});

export const useGetFilterPostList = () => {
  return useRecoilValue(filterPostListState);
};

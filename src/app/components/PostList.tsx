"use client";

import React, { useEffect } from "react";
import postStyles from "../styles/post.module.css";
import DateView from "./DateView";
import Link from "next/link";
import TagItem from "./TagItem";
import { useGetFilterPostList, useSetPostList } from "../hooks/postRecoil";
import { IPostEntity } from "@/domain/entities/Post";
import { IPostVM, PostVM } from "@/vm/Post";

type PostListProps = IPostEntity[];

export const PostList = ({ posts }: { posts: PostListProps }) => {
  const setList = useSetPostList();
  const filterPostListState = useGetFilterPostList();

  const postVMList: IPostVM[] = filterPostListState.map((post) =>
    PostVM.entityToVM(post)
  );
  useEffect(() => {
    setList(posts);
  }, []);

  return (
    <ul className="flex flex-col gap-12 max-w-[840px] p-0">
      {postVMList &&
        postVMList.map(
          ({ contentId, title, description, date, category, tags }) => (
            <li
              className={`w-auto transition-all ease-in duration-100 transition-e list-none ${postStyles.scale}`}
              key={contentId}
            >
              <Link
                className="inline-block w-full"
                href={`/posts/${category}/${contentId}`}
              >
                <p className="flex justify-between m-0 gap-2">
                  {tags && tags.length > 0 ? (
                    <span className="flex gap-2 flex-wrap">
                      {tags.map((tag, index) => (
                        <TagItem key={index} tagName={tag} />
                      ))}
                    </span>
                  ) : (
                    <></>
                  )}
                  <DateView dateString={date} />
                </p>
                <h3 className="block m-0 font-bold mt-1">{title}</h3>
                <span className="block mt-2 text-text-description">
                  {description}
                </span>
              </Link>
            </li>
          )
        )}
    </ul>
  );
};

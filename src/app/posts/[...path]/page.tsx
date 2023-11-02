import DateView from "@/app/components/DateView";
import React from "react";
import "./style.css";
import di from "@/di";
import { PostVM } from "@/vm/Post";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeBlock from "./components/mdx/CodeBlock";

const components = { CodeBlock };

export const dynamicParams = false;

export async function generateStaticParams() {
  const postsProperties = await di.post.getPostsProperties();
  return postsProperties.map(({ category, contentId }) => {
    return {
      path: [category, contentId],
    };
  });
}

export default async function Post({ params }: { params: { path: string[] } }) {
  const { path } = params;
  const postData = await di.post.getPostDataFromNotion(path[path.length - 1]);
  const postVM = PostVM.entityToVM(postData);

  return (
    <>
      <div className="post-header">
        <h1 className="title">{postVM.title as string}</h1>
        <DateView dateString={postVM.date as string} />
      </div>
      {postVM.form === "mdx" && (
        <div className="content">
          <MDXRemote source={postVM.content} components={components} />{" "}
        </div>
      )}
      {postVM.form === "md" && (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postVM.content }}
        />
      )}
    </>
  );
}

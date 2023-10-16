import DateView from "@/app/components/DateView";
import React from "react";
import "./style.css";
import di from "@/di";
import { PostVM } from "@/vm/Post";

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = await di.post.getPostRoutingPath();
  return paths.map(({ params }) => {
    return {
      path: params.routingPath,
    };
  });
}

export default async function Post({ params }: { params: { path: string[] } }) {
  const { path } = params;
  const postData = await di.post.getPostDataByRoutingPath(path);
  const postVM = new PostVM(postData);

  return (
    <>
      <div className="post-header">
        <h1 className="title">{postVM.title as string}</h1>
        <DateView dateString={postVM.date as string} />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postVM.content }}
      />
    </>
  );
}

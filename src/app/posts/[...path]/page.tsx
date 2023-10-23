import DateView from "@/app/components/DateView";
import React from "react";
import "./style.css";
import di from "@/di";
import { PostVM } from "@/vm/Post";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeBlock from "./components/mdx/CodeBlock";

const components = { CodeBlock }

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
      { postVM.content.mdxSource && <div className="content"><MDXRemote 
        source={postVM.content.mdxSource} 
        components={components}
      /> </div>}
      { postVM.content.htmlContent && <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postVM.content.htmlContent }}
      /> }
      
    </>
  );
}

import DateView from '@/app/components/DateView';
import React from 'react'
import "./style.css";
import { getAllPostPaths, getPostData } from '@/libraries/post';

export const dynamicParams = false;

export function generateStaticParams() {
	const paths = getAllPostPaths();
	return paths.map(({ params }: { params: { path: string[] }}) => ({
    path: params.path,
  }))
}

const parsePath = (path: string[]) => {

	let id: string = "";
	const category: string[] = [];

	if (path.length <= 1) {
		id = path[0];
	} else {
		id = path[path.length - 1];
		category.push(...path.slice(0, path.length - 1));
	}

  return {
    id, category
  }
}

export default async function Post({ params }: { params: { path: string[] }}) {

  const { path } = params;
  const { id, category } = parsePath(path);

  const postData = await getPostData(id, category);


  return (
    <>
      <div className="post-header">
        <h1 className="title">{postData.title as string}</h1>
        <DateView dateString={postData.date as string} />
      </div>
			<div className="content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  )
}
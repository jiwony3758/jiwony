import { http } from '@/adapter/infrastructure/http';
import DateView from '@/components/DateView';
import React from 'react'
import "./style.css";


export default async function Post({ params }: { params: { path: string[] }}) {

  const { path } = params;
  const pathString = path.toString().replaceAll(",", "/");

  const { postData } = await http.request({
    url: `http://localhost:3000/api/blog/posts/${pathString}`,
    method: "GET",
    next: {
      revalidate: 5
    }
  })

  return (
    <>
      <div className="post-header">
        <h1 className="title">{postData.title}</h1>
        <DateView dateString={postData.date} />
      </div>
			<div className="content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  )
}
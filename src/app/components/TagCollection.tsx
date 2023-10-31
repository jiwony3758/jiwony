import React from 'react'
import TagItem from './TagItem';

export default function TagCollection({ tags }: { tags: string[] }) {
  return (
    <div className='flex flex-wrap gap-3'>
      {tags.map((tag, index) => <TagItem key={index} tagName={tag}/>) }
    </div>
  )
}

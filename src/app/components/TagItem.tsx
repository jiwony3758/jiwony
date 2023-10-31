import React from 'react'

export default function TagItem({ tagName }: { tagName: string }) {
  return (
    <span 
      className="text-text-primary whitespace-nowrap bg-background-tag-rgb py-[2px] px-1 rounded-md hover:bg-background-tag-hover-rgb cursor-pointer"
    >
          {tagName}
    </span>
  )
}

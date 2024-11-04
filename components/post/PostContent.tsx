"use client"
import { usePost } from '@/app/contexts/PostProvider'
import React from 'react'

const PostContent = () => {
    const postContext = usePost();
  return (
    <div>{postContext?.currentPost.content}</div>
  )
}

export default PostContent
"use client";
import { usePost } from "@/app/contexts/PostProvider";
import React from "react";
import Comments from "../comments/Comments";

const PostFooter = () => {
  const postContext = usePost();
  //@ts-ignore
  const { currentPost } = postContext;

  if (currentPost?.comments?.length === 0)
    return (
      <>
        <div className="p-4 text-lg font-light border-y w-full">Replies</div>
        <div className="p-4">No comments yet.</div>
      </>
    );

  return (
    <>
      <div className="p-4 font-light border-y w-full">Replies</div>
      <Comments />
    </>
  );
};

export default PostFooter;

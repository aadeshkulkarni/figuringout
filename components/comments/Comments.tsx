//@ts-nocheck
"use client";

import Image from "next/image";
import React from "react";
import PostMenu from "../posts/PostMenu";
import { useSession } from "next-auth/react";
import { formatDate } from "@/app/lib/util";
import CommentMenu from "./CommentMenu";
import { usePost } from "@/app/contexts/PostProvider";

interface CommentProps {
  _id: string;
  userId: {
    name: string;
    profilePic: string;
    _id: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Comments = () => {
  const postContext = usePost(); 
  const commentsList = postContext?.currentPost?.comments;
  const session = useSession();
  if (commentsList.length === 0) return;

  return (
    <div className="flex flex-col w-full gap-1">
      {commentsList.map((comment: CommentProps) => (
        <div key={comment._id} className="flex items-center justify-between gap-4 text-primary font-semibold p-4 border border-accent">
          <div className="flex items-center justify-between gap-4">
            <Image
              className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
              width="40"
              height="40"
              src={comment?.userId?.profilePic}
              alt={comment?.userId?.name}
            />
            <div>
              <div>{comment.userId.name}</div>
              <div className="font-medium">{comment?.content}</div>
            </div>
          </div>
          <CommentMenu isAuthor={comment.userId._id === session?.data?.user?.id} />
        </div>
      ))}
    </div>
  );
};

export default Comments;

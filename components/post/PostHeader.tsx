//@ts-nocheck
"use client";
import Image from "next/image";
import React from "react";
import PostMenu from "../posts/PostMenu";
import { usePost } from "@/app/contexts/PostProvider";
import { useSession } from "next-auth/react";

const PostHeader = () => {
  const postContext = usePost();
  const session = useSession();
  //@ts-ignore
  const userId = session?.data?.user.id;
  //@ts-ignore
  const { currentPost } = postContext;
  const formattedCreatedDate = currentPost.createdAt ? new Date(currentPost.createdAt).toLocaleDateString('en-US') : "";
  return (
    <div className="flex items-center justify-between gap-4 text-primary pr-4">
      <div className="flex items-center justify-between gap-4 text-primary">
        <Image
          className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
          width="40"
          height="40"
          src={currentPost.user?.profilePic}
          alt={currentPost.user?.name}
        />
        <div className="font-semibold">{currentPost?.user?.name}</div>
        <div className="text-sm text-muted-foreground">{formattedCreatedDate}</div>
      </div>
      <PostMenu isAuthor={userId === session?.data?.user?.id} />
    </div>
  );
};

export default PostHeader;

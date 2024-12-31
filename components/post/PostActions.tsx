"use client";
import React from "react";
import { Button } from "../ui/button";
import { Heart, Repeat, Send } from "lucide-react";
import CreateComment from "../comments/CreateComment";
import { usePost } from "@/app/contexts/PostProvider";
import { useSession } from "next-auth/react";

const PostActions = () => {
  const postContext = usePost();
  const session = useSession();
  //@ts-ignore
  const userId = session?.data?.user.id;
  //@ts-ignore
  const { currentPost, setCurrentPost } = postContext;
  
  const likePost = async (event:any) => {
    if (currentPost?._id) {
      if(currentPost.likes[userId]) {
        const { userId, ...rest } = currentPost.likes
        setCurrentPost({...currentPost, likes: [...rest]})
      }
      else {
        setCurrentPost({...currentPost, likes: [...currentPost.likes, userId]})
      }
      await postContext?.likePost(currentPost?._id);
    }
  };

  return (
    <div className="flex gap-1">
      <Button variant="ghost" onClick={likePost}>
        <Heart
          className={`w-5 h-5 ${
            userId && currentPost?.likes[userId]
              ? "fill-rose-600 stroke-rose-600"
              : "fill-transparent"
          }`}
        />{" "}
        {currentPost.likes && Object.keys(currentPost.likes)?.length}
      </Button>
      <CreateComment postId={currentPost._id} total={currentPost.comments.length} />
      <Button variant="ghost">
        <Repeat className="w-5 h-5" /> 4
      </Button>
      <Button variant="ghost">
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PostActions;

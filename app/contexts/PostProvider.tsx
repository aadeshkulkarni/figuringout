"use client";

import { createContext, useContext, useState } from "react";
import { fetchPostById } from "../actions/posts";
import axios from "axios";

type Post = {
  currentPost: Partial<PostProps>;
  getPostById: (postId: string) => {};
  likePost: (postId: string) => {};
  addComment: (postId: string, comment: string) => {};
};

const PostContext = createContext<Post | undefined>(undefined);

export const PostProvider = ({ value, children }: { value: Object; children: React.ReactNode }) => {
  const [currentPost, setCurrentPost] = useState<any>(value);

  async function getPostById(postId: string) {
    const post = await fetchPostById(postId);
    setCurrentPost(post);
  }

  const likePost = async (postId: string) => {
    if (postId) {
      const data = await axios(`/api/post/like/${postId}`);
      await getPostById(postId);
    }
  };

  const addComment = async (postId: string, comment: string) => {
    if (postId && comment.trim() !== "") {
      const response = await axios.post("/api/post/comment", {
        postId: postId,
        content: comment,
      });
      await getPostById(postId);
      return response;
    }
  };

  let values = {
    currentPost,
    setCurrentPost,
    getPostById,
    likePost,
    addComment
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export const usePost = () => useContext(PostContext);

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchPosts } from "../actions/posts";
import axios from "axios";

type Posts = {
  posts: Array<PostProps>;
  getAllPosts: () => {};
  likePost: (userId: string) => {};
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
};

const PostsContext = createContext<Posts | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function getAllPosts() {
    const PostList: PostProps[] = await fetchPosts();
    setPosts(PostList);
  }

  const likePost = async (userId: string) => {
    if (userId) {
      const data = await axios(`/api/post/like/${userId}`);
      await getAllPosts();
    }
  };

  useEffect(()=>{
    getAllPosts();
  },[])

  let values = {
    posts,
    setPosts,
    getAllPosts,
    likePost
  };

  return <PostsContext.Provider value={values}>{children}</PostsContext.Provider>;
};

export const usePosts = () => useContext(PostsContext);

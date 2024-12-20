"use client";

import { usePosts } from "@/app/contexts/PostsProvider";
import Post, { NoPosts } from "./Post";
import PostListShimmer from "../shimmer/PostListShimmer";

const PostList = () => {
  const postContext = usePosts();

  if (postContext?.posts.length === 0) return (<PostListShimmer />);

  return postContext?.posts.map(({ _id, ...data }: PostProps) => (
    <Post key={_id} {...data} _id={_id} />
  ));
};

export default PostList;

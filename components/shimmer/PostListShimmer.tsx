import React from "react";
import PostShimmer from "./PostShimmer";

const PostListShimmer = () => {
  return (
    <div className="flex flex-col gap-1 items-center min-h-screen shadow-md">
      {[1, 2, 3, 4, 5].map(() => (
        <PostShimmer />
      ))}
    </div>
  );
};

export default PostListShimmer;

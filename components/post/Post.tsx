"use client";

import { fetchPostById } from "@/app/actions/posts";
import { PostProvider } from "@/app/contexts/PostProvider";
import GoBack from "@/components/GoBack";
import PostActions from "@/components/post/PostActions";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import PostShimmer from "@/components/shimmer/PostShimmer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

const Post = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<any>();
  useEffect(() => {
    async function init() {
      const postData = await fetchPostById(postId);
      setPost(postData);
    }
    init();
  }, []);

  if (!post) return <PostShimmer />;
  return (
    <PostProvider value={post}>
      <div className="w-full p-4 md:p-0 md:w-fit">
        <GoBack />
        <Card className="w-full md:w-[680px] md:min-h-[680px]">
          <CardHeader className="pb-4">
            <PostHeader />
          </CardHeader>
          <CardContent className="text-lg">
            <PostContent />
          </CardContent>
          <CardContent>
            <PostActions />
          </CardContent>
          <CardFooter className="flex flex-col items-end gap-2">
            <PostFooter />
          </CardFooter>
        </Card>
      </div>
    </PostProvider>
  );
};

export default Post;

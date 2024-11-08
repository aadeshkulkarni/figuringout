import Post from "@/components/post/Post";
import PostShimmer from "@/components/shimmer/PostShimmer";

const Page = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const postId = (await params).postId;
  if (!postId) return <PostShimmer />; // Sonner to notify user that something isn't right.

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-20 pb-20 md:p-20 shadow-md">
      <Post postId={postId} />
    </div>
  );
};

export default Page;

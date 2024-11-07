import { fetchPostById } from "@/app/actions/posts";
import { PostProvider } from "@/app/contexts/PostProvider";
import GoBack from "@/components/GoBack";
import PostActions from "@/components/post/PostActions";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import PostShimmer from "@/components/shimmer/PostShimmer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const Page = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const postId = (await params).postId;
  if (!postId) return; // Sonner to notify user that something isn't right.

  const postData = await fetchPostById(postId);
  if(!postData) return <PostShimmer />
  return (
    <div className="relative flex flex-col items-center min-h-screen pt-20 pb-20 md:p-20 shadow-md">
      <PostProvider value={postData}>
        <div>
          <GoBack />
          <Card className="w-full md:w-[680px] md:min-h-[680px] md:rounded-3xl">
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
    </div>
  );
};

export default Page;

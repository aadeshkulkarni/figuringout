import CreatePost from "@/components/posts/CreatePost";
import PostList from "@/components/posts/PostList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession();

  return (
    <div className="flex flex-col gap-4 px-4 md:px-0 items-center min-h-screen py-20 shadow-md">
      <CreatePost>
        <Card className="rounded-t-3xl w-screen md:w-[680px] cursor-pointer text-lg">
          <CardContent className="flex items-center justify-between gap-4 p-4 py-8 pl-6 ">
            <Image
              src={session?.user?.image || ""}
              className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
              width="40"
              height="40"
              alt="User profile picture"
            />
            <div className="flex-1 pt-2 text-left cursor-text text-gray-500">What&apos;s new?</div>
            <div className={cn(buttonVariants({ variant: "outline", className: "mr-4 font-bold" }))}>Post</div>
          </CardContent>
        </Card>
      </CreatePost>
      <PostList />
    </div>
  );
};

export default Home;

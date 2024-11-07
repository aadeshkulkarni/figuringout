"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Repeat, Send } from "lucide-react";
import { Button } from "..//ui/button";
import PostMenu from "./PostMenu";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePosts } from "@/app/contexts/PostsProvider";
import { toast } from "sonner";
import { formatDate } from "@/app/lib/util";

const Post: React.FC<PostProps> = ({ _id, user, content, likes, comments }) => {
  const postsContext = usePosts();
  const session = useSession();
  const router = useRouter();
  // @ts-ignore
  const userId = session?.data?.user?.id;

  const likePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(!userId) {
      toast("You need to sign up to perform this task", {
        description: formatDate(new Date()),
        action: {
          label: "Get started",
          onClick: () => signIn(),
        },
      });
    }
    if (_id) {
      await postsContext?.likePost(_id);
    }
  };

  return (
    <Card
      className="w-screen md:w-[680px] text-lg cursor-pointer active:shadow-lg active:bg-accent"
      onClick={() => router.push(`/post/${_id}`)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4 text-primary font-semibold pr-4">
          <div className="flex items-center justify-between gap-4 text-primary font-semibold">
            <Image
              className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
              width="40"
              height="40"
              src={user.profilePic}
              alt={user.name}
            />
            <div>{user?.name}</div>
          </div>
          <PostMenu isAuthor={userId === user._id} />
        </div>
      </CardHeader>
      <CardContent className="md:pl-[80px] md:pr-[40px]">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="md:pl-[60px]">
        <div className="flex gap-1">
          <Button variant="ghost" onClick={likePost}>
            <Heart
              className={`w-5 h-5 ${
                likes[userId] ? "fill-rose-600 stroke-rose-600" : "fill-transparent"
              }`}
            />{" "}
            {Object.keys(likes)?.length}
          </Button>
          <Button variant="ghost" onClick={() => router.push(`/post/${_id}`)}>
            <MessageSquare className="w-5 h-5" /> {comments?.length}
          </Button>
          <Button variant="ghost" disabled>
            <Repeat className="w-5 h-5" /> 4
          </Button>
          <Button variant="ghost" disabled>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const NoPosts: React.FC = () => {
  return (
    <Card className="w-[680px] flex flex-col justify-center items-center p-4">
      <CardDescription className="h-[100px] flex items-center">No Posts available</CardDescription>
    </Card>
  );
};

export const PostSchimmer: React.FC = () => {
  return (
    <Card className="w-[680px] text-lg">
      <CardHeader>
        <CardDescription className="flex items-center gap-4 text-primary font-semibold">
          <div className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"></div>
          <div className="bg-primary-foreground w-2/5 rounded-md h-[30px]"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-[80px] pr-[40px]">
        <p className="bg-primary-foreground w-full rounded-md h-[40px]"></p>
      </CardContent>
      <CardFooter className="pl-[60px]">
        <div className="flex gap-1">
          <Button variant="ghost">
            <div className="w-5 h-5 bg-primary-foreground rounded-full"> </div>
          </Button>
          <Button variant="ghost">
            <div className="w-5 h-5 bg-primary-foreground rounded-full"> </div>
          </Button>
          <Button variant="ghost">
            <div className="w-5 h-5 bg-primary-foreground rounded-full"> </div>
          </Button>
          <Button variant="ghost">
            <div className="w-5 h-5 bg-primary-foreground rounded-full"> </div>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;

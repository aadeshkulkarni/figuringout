import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Repeat, Send } from "lucide-react";
import { Button } from "..//ui/button";
import PostMenu from "./PostMenu";

const Post: React.FC<PostProps> = ({ user, content, likes, comments }) => {
  return (
    <Card className="w-[600px] text-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4 text-primary font-semibold pr-4">
          {/* TODO: Add User Image here */}
          <div className="flex items-center justify-between gap-4 text-primary font-semibold">
            <div className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"></div> 
            <div>{user?.name}</div>
          </div>
          <PostMenu  />
        </div>
      </CardHeader>
      <CardContent className="pl-[80px] pr-[40px]">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="pl-[60px]">
        <div className="flex gap-1">
          <Button variant="ghost">
            <Heart className="w-5 h-5" /> {likes?.length}
          </Button>
          <Button variant="ghost">
            <MessageSquare className="w-5 h-5" /> {comments?.length}
          </Button>
          <Button variant="ghost">
            <Repeat className="w-5 h-5" /> 4
          </Button>
          <Button variant="ghost">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const NoPosts: React.FC = () => {
  return (
    <Card className="w-[600px] flex flex-col justify-center items-center p-4">
      <CardDescription className="h-[100px] flex items-center">No Posts available</CardDescription>
    </Card>
  );
};

export const PostSchimmer: React.FC = () => {
  return (
    <Card className="w-[600px] text-lg">
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

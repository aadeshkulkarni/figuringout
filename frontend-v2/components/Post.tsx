import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Repeat, Send } from "lucide-react";
import { Button } from "./ui/button";

const Post: React.FC<PostProps> = ({ author, content, likes, comments, reposts }) => {
  return (
    <Card className="w-[600px] text-lg">
      <CardHeader>
        <CardDescription className="flex items-center gap-4 text-primary font-semibold">
          <div className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"></div>
          <div>{author}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-[80px] pr-[40px]">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="pl-[60px]">
        <div className="flex gap-1">
          <Button variant="ghost">
            <Heart className="w-5 h-5" /> {likes}
          </Button>
          <Button variant="ghost">
            <MessageSquare className="w-5 h-5" /> {comments}
          </Button>
          <Button variant="ghost">
            <Repeat className="w-5 h-5" /> {reposts}
          </Button>
          <Button variant="ghost">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;

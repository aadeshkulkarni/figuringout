"use client";

import Post from "@/components/Post";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import PostList from "../mock/Posts.json";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] shadow-md">
      <Button className="absolute top-5 right-5">
        <Link href="/login">Login</Link>
      </Button>
      <Dialog>
        <DialogTrigger>
          <Card className="rounded-t-3xl w-[600px] cursor-pointer text-lg">
            <CardDescription className="flex items-center justify-between gap-4 p-4 pl-6 ">
              <div className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"></div>
              <div className="flex-1 pt-2 text-left text-lg">What&apos;s new?</div>
              <div className={cn(buttonVariants({ variant: "outline", className: "mr-4 text-primary" }))}>
                Post
              </div>
            </CardDescription>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-3/5 h-2/5">
          <DialogHeader>
            <DialogTitle>New post</DialogTitle>
            <DialogDescription className="py-4">
              <Textarea rows={10} placeholder="What's new?"></Textarea>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {PostList.map((data: PostProps) => (
        <Post key={data.id} {...data} />
      ))}
    </div>
  );
}

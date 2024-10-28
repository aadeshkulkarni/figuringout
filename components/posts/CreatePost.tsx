"use client";

import React, { useState, ChangeEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const maxCharacters = 300;
  const [open, setOpen] = useState(false);
  const session = useSession();
  const [content, setContent] = useState<string>("");
  const isAuthenticated = session.status == "authenticated";
  if (!isAuthenticated) return;

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setContent(value);
    } else {
      setContent(value.substring(0, maxCharacters));
    }
  };
  const createPost = async () => {
    if (content.trim() === "") {
      return;
    }

    const response = await axios.post("/api/post", {
      content,
    });

    if (response) {
      setContent("");
      setOpen(false);
    }

    console.log("Response: ", response);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-fit">
        <Card className="rounded-t-3xl w-[600px] cursor-pointer text-lg">
          <CardContent className="flex items-center justify-between gap-4 p-4 pl-6 ">
            <Image
              src={session?.data?.user?.image || ""}
              className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
              width="40"
              height="40"
              alt="User profile picture"
            />
            <div className="flex-1 pt-2 text-left text-lg">What&apos;s new?</div>
            <div
              className={cn(buttonVariants({ variant: "outline", className: "mr-4 text-primary" }))}
            >
              Post
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-3/5">
        <DialogHeader>
          <DialogTitle>New post</DialogTitle>
          <DialogDescription className="py-4">
            <Textarea
              onChange={onContentChange}
              value={content}
              rows={8}
              className="text-lg"
              placeholder="What's new?"
            ></Textarea>
            <div className="mt-2 text-gray-600 text-right">
              {content.length}/{maxCharacters} characters
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={createPost}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;

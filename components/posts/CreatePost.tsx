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
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { formatDate } from "@/app/lib/util";
import { usePosts } from "@/app/contexts/PostsProvider";

const CreatePost = ({ openOnLoad = false, children}: { openOnLoad?: boolean, children?: React.ReactElement }) => {
  const postContext = usePosts();
  const maxCharacters = 300;
  const [open, setOpen] = useState(openOnLoad);
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
      toast("Content cannot be empty", {
        description: formatDate(new Date()),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    const response = await axios.post("/api/post", {
      content,
    });

    if (response) {
      setContent("");
      setOpen(false);
      toast("Post has been created.", {
        description: formatDate(new Date()),
        action: {
          label: "View",
          onClick: () => console.log("TODO : Add a link to the new post "),
        },
      });
      postContext?.getAllPosts();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="w-screen h-full md:h-fit md:w-3/5">
        <DialogHeader>
          <DialogTitle>New post</DialogTitle>
          <DialogDescription className="py-4">
            <Textarea
              onChange={onContentChange}
              value={content}
              rows={8}
              className="text-lg focus:outline-none focus:border-0"
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

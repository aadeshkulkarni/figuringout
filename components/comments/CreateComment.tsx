"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { formatDate } from "@/app/lib/util";
import { MessageSquare } from "lucide-react";
import { usePost } from "@/app/contexts/PostProvider";

interface AddCommentProps {
  postId: string;
  total: number
}

const CreateComment: React.FC<AddCommentProps> = ({ postId, total }) => {
  const postContext = usePost();
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

  

  const CreateComment = async () => {
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

    const response = await postContext?.addComment(postId, content);

    if (response) {
      setContent("");
      setOpen(false);
      toast("Comment has been created.", {
        description: formatDate(new Date()),
        action: {
          label: "View",
          onClick: () => console.log("TODO : Add a link to the new comment "),
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-fit">
        <Button variant="ghost">
          <MessageSquare className="w-5 h-5" /> {total}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen md:w-3/5">
        <DialogHeader>
          <DialogTitle>New Comment</DialogTitle>
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
          <Button variant="outline" onClick={CreateComment}>
            Add comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComment;

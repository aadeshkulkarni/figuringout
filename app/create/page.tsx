"use client";
import CreatePost from "@/components/posts/CreatePost";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { formatDate } from "../lib/util";
import { signIn, useSession } from "next-auth/react";

const page = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast("You need to sign up to perform this task", {
        description: formatDate(new Date()),
        action: {
          label: "Get started",
          onClick: () => signIn(),
        },
      });
    }
  }, []);

  return <CreatePost openOnLoad={true} />;
};

export default page;

"use client";

import { SessionProvider } from "next-auth/react";
import { PostsProvider } from "./contexts/PostsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PostsProvider>{children}</PostsProvider>
    </SessionProvider>
  );
}

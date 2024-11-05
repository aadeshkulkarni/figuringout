"use client";

import { SessionProvider } from "next-auth/react";
import { PostsProvider } from "./contexts/PostsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <PostsProvider>{children}</PostsProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

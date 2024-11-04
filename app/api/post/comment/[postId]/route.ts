import { NEXT_AUTH } from "@/app/lib/auth";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  // @ts-ignore
  const postId = (await params).postId;
  if (!postId) return NextResponse.json({ message: "PostId missing" });
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return NextResponse.json({ message: "Not Authenticated" });
  const post = await Post.findById(postId);
  if (!post) {
    return NextResponse.json({ message: "Post not found" });
  }

  const comments = await Comment.find({ postId: postId });
  return NextResponse.json(comments);
};

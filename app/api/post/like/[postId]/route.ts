import { NEXT_AUTH } from "@/app/lib/auth";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// TODO: Refactor Error handling
export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  // @ts-ignore
  const postId = (await params).postId;
  if (!postId) return NextResponse.json({ message: "PostId missing" });
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return NextResponse.json({ message: "Not Authenticated" });
  const userId = session?.user?.id;
  const post = await Post.findById(postId);
  if (!post) {
    return NextResponse.json({ message: "Post not found" });
  }
  const likeIndex = post.likes.findIndex((like: { userId: { equals: (arg0: any) => any; }; }) => like.userId.equals(userId));
  if (likeIndex === -1) {
    // User hasn't liked the post yet, add the like
    post.likes.push({ userId, timestamp: new Date() });
    await post.save();
    return NextResponse.json(post);
  } else {
    // User has already liked the post, remove the like
    post.likes.splice(likeIndex, 1);
    await post.save();
    return NextResponse.json(post);
  }

};

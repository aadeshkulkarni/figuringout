import { NEXT_AUTH } from "@/app/lib/auth";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// TODO: Refactor Error handling 
export const GET = async (request: Request, { params }: { params: { postId: string } }) => {
  const postId = await params.postId;
  if (!postId) return NextResponse.json({ message: "PostId missing" });
  const session = await getServerSession(NEXT_AUTH);
  if (!session) return NextResponse.json({ message: "Not Authenticated" });
  const userId = session?.user?.id;
  const post = await Post.findById(postId);
  if (!post) {
    return NextResponse.json({ message: "Post not found" });
  }
  const alreadyLiked = post.likes.some((like: { userId: { equals: (arg0: any) => any; }; }) => like.userId.equals(userId));
  if (!alreadyLiked) {
    post.likes.push({ userId, timestamp: new Date() });
    await post.save();
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ message: "Post already liked" });
  }
};

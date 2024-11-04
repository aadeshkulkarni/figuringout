import { NEXT_AUTH } from "@/app/lib/auth";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// TODO: Refactor Error handling
export const POST = async (request: Request) => {

  const session = await getServerSession(NEXT_AUTH);
  //@ts-ignore
  const userId = session?.user?.id;
  const { postId, content } = await request.json();
  if (!postId || !content || !userId) {
    return new Response(JSON.stringify({ message: "postId, content, and userId are required." }), {
      status: 400,
    });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found." }), { status: 404 });
    }
    const objectId = new mongoose.Types.ObjectId(userId);
    const newComment = {
      userId: objectId,
      content,
    };
    post.comments.push(newComment);
    await post.save();

    return new Response(
      JSON.stringify({ message: "Comment added successfully.", comment: newComment }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred while adding the comment." }),
      { status: 500 }
    );
  }
};

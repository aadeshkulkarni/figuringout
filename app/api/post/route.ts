import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";

export const GET = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const posts = await Post.find();
    return NextResponse.json({ message: "Job ran successfully", data: posts });
  } catch (error) {
    console.log("[GET Post]: ", error);
    return NextResponse.json({ message: "Something went wrong ", error: error });
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user.id;

    const { content, postAs = "Anonymous" } = await req.json();
    await mongoose.connect(process.env.MONGODB_URI!);
    const newPost = new Post({
      content: content,
      postAs: postAs,
      likes: [],
      comments: [],
      share: [],
      createdAt: new Date(),
      user: userId,
    });
    const post = await newPost.save();
    return NextResponse.json({ message: "Job ran successfully", data: post });
  } catch (error) {
    console.log("[GET Post]: ", error);
    return NextResponse.json({ message: "Something went wrong ", error: error });
  }
};

import Post from "@/models/Post";
import mongoose from "mongoose";

export const fetchPosts = async (): Promise<PostProps[]> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log("MONGODB_URI is missing. Please set the environment variable.");
    return []; // Optionally return an empty array or handle it as needed
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .select("_id user content likes comments createdAt")
      .lean();

    return posts.map((post) => ({
      _id: (post as PostProps)._id.toString(),
      user: {
        _id: post.user._id.toString(),
        name: post.user.name,
      },
      content: post.content,
      likes: post.likes || [],
      comments: post.comments || [],
      createdAt: post.createdAt,
    }));
  } catch (error) {
    console.log("[FetchPost]: ", error);
    return [];
  }
};

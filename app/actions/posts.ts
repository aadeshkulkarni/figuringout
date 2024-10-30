"use server";

import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI!);
import Post from "@/models/Post";

export const fetchPosts = async (): Promise<PostProps[]> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log("MONGODB_URI is missing. Please set the environment variable.");
    return []; // Optionally return an empty array or handle it as needed
  }
  try {
    const posts = await Post.find()
      .populate("user", "name profilePic")
      .select("_id user content likes comments createdAt")
      .lean();

    const transformedPosts = posts.map((post) => {
      const likesObject = post.likes.reduce(
        (
          acc: any,
          like: {
            userId: any;
            timestamp: string;
          }
        ) => {
          acc[like.userId.toString()] = like.timestamp; // Convert ObjectId to string
          return acc;
        },
        {}
      );

      return {
        _id: (post as PostProps)._id.toString(),
        user: {
          _id: post.user._id.toString(),
          name: post.user.name,
          profilePic: post.user.profilePic
        },
        content: post.content,
        likes: likesObject, // Replace likes array with transformed object
        comments: post.comments || [],
        createdAt: post.createdAt,
      };
    });

    return transformedPosts;
  } catch (error) {
    console.log("[FetchPost]: ", error);
    return [];
  }
};

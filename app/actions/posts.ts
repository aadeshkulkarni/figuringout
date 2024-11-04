//@ts-nocheck
"use server";

import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI!);
import Post from "@/models/Post";
import User from "@/models/User";

export const fetchPosts = async (): Promise<PostProps[]> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log("MONGODB_URI is missing. Please set the environment variable.");
    return [];
  }
  try {
    const posts = await Post.find()
      .populate("user", "name profilePic",  User)
      .select("_id user content likes comments createdAt")
      .sort({ createdAt: -1 })
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
          acc[like.userId.toString()] = like.timestamp;
          return acc;
        },
        {}
      );

      return {
        _id: (post as PostProps)._id.toString(),
        user: {
          _id: post.user._id.toString(),
          name: post.user.name,
          profilePic: post.user.profilePic,
        },
        content: post.content,
        likes: likesObject,
        comments: post.comments || [],
        createdAt: post.createdAt,
      };
    });

    return JSON.parse(JSON.stringify(transformedPosts))
  } catch (error) {
    console.log("[FetchPost]: ", error);
    return [];
  }
};

export const fetchPostById = async (postId: string) => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log("MONGODB_URI is missing. Please set the environment variable.");
    return [];
  }

  try {
    const post = await Post.findOne({ _id: postId })
      .populate("user", "name profilePic", User)
      .populate("comments.userId", "name profilePic")
      .select("_id user content likes comments createdAt")
      .lean();

    const likesObject = post?.likes?.reduce(
      (
        acc: any,
        like: {
          userId: any;
          timestamp: string;
        }
      ) => {
        acc[like.userId.toString()] = like.timestamp; 
        return acc;
      },
      {}
    );

    let transformedObject = {
      _id: (post as PostProps)?._id.toString(),
      user: {
        _id: post?.user._id.toString(),
        name: post?.user.name,
        profilePic: post?.user.profilePic,
      },
      content: post?.content,
      likes: likesObject, 
      comments: post?.comments,
      createdAt: post?.createdAt,
    };

    return JSON.parse(JSON.stringify(transformedObject));
    
  } catch (error) {
    console.log("[FetchPostById]: ", error);
    return [];
  }
};

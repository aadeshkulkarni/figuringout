"use server";
import mongoose from "mongoose";
import { commentsSchema } from "./Comment";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  comments: [commentsSchema],
  share: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  postAs: { type: String, required: true, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
  region: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

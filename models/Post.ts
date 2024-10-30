"use server";
import mongoose from "mongoose";
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
  comments: { type: Array, required: false },
  share: { type: Array, required: false },
  postAs: { type: String, required: true, default: "Anonymous" },
  createdAt: { type: String, required: false },
  region: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

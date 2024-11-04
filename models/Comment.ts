import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);

export const commentsSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentsSchema);

export default Comment;
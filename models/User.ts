import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, required: false },
  createdAt: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

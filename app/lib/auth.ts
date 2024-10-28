import User from "@/models/User";
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token }: { token: any }) => {
      await mongoose.connect(process.env.MONGODB_URI!);
      const existingUser = await User.findOne({ email: token?.email });
      if (existingUser) {
        token.userId = existingUser._id;
      } else {
        const newUser = new User({
          name: token?.name,
          email: token?.email,
          profilePic: token?.picture,
          createdAt: new Date(),
        });
        await newUser.save();
        token.userId = newUser._id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
    signIn: ({ user }: { user: any }) => {
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
};

import dbConnect from "@/lib/db";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import UserModel from "@/models/user.model";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      isVerified: boolean;
      email: string;
      avatar: string;
      fullName: string;
    };
  }
  interface User {
    _id: string;
    isVerified: boolean;
    email: string;
    avatar: string;
    fullName: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials?.email,
          });
          if (!user) {
            throw new Error("Invalid email");
          }

          if (!user.isVerified) {
            throw new Error("User is not verified");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return user as unknown as User;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.avatar = user.avatar;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString() || "";
        session.user.isVerified = token.isVerified as boolean;
        session.user.email = token.email || "";
        session.user.avatar = (token.avatar as string) || token.picture || "";
        session.user.fullName = (token.fullName as string) || token.name || "";
      }
      return session;
    },
    async signIn({ profile }) {
      if (!profile?.email) return false;

      try {
        await dbConnect();
        let user = await UserModel.findOne({ email: profile.email });

        if (!user) {
          user = await UserModel.create({
            email: profile.email,
            fullName: profile.name,
            password: "google",
            avatar: profile.image,
            isVerified: true,
            loginType: "google",
          });
        }

        if (user) return true;
        else return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

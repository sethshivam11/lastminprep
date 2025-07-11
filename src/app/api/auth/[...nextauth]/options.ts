import dbConnect from "@/lib/db";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import UserModel, { DEFAULT_USER_AVATAR } from "@/models/user.model";
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
    async jwt({ token, user, trigger }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.avatar = user.avatar;
        token.fullName = user.fullName;
      }

      if (trigger === "update") {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: token.email });
        if (existingUser) {
          token._id = existingUser._id?.toString();
          token.isVerified = existingUser.isVerified;
          token.email = existingUser.email;
          token.avatar = existingUser.avatar;
          token.fullName = existingUser.fullName;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (!token._id) {
          await dbConnect();
          const existingUser = await UserModel.findOne({ email: token.email });
          if (existingUser) {
            token._id = (existingUser._id as string).toString();
            token.isVerified = existingUser.isVerified;
            token.avatar = existingUser.avatar;
            token.fullName = existingUser.fullName;
          }
        }
        session.user._id = token._id?.toString() || "";
        session.user.isVerified = token.isVerified as boolean;
        session.user.email = token.email || "";
        session.user.avatar = (token.avatar as string) || "";
        session.user.fullName = (token.fullName as string) || token.name || "";
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        if (user.isVerified) {
          return true;
        } else return false;
      }
      if (!profile?.email) return false;

      try {
        await dbConnect();
        let existingUser = await UserModel.findOne({ email: profile.email });
        let avatar = DEFAULT_USER_AVATAR;

        if (account?.provider === "google") {
          avatar =
            "picture" in profile
              ? (profile.picture as string)
              : DEFAULT_USER_AVATAR;
        } else if (account?.provider === "github") {
          avatar =
            "avatar_url" in profile
              ? (profile.avatar_url as string)
              : DEFAULT_USER_AVATAR;
        }

        if (!existingUser) {
          existingUser = await UserModel.create({
            email: profile.email,
            fullName: profile.name,
            avatar,
            isVerified: true,
            loginType: account?.provider,
          });
        }

        if (existingUser && existingUser.loginType === account?.provider)
          return true;
        else if (existingUser.loginType !== account?.provider) {
          throw new Error("INVALID_LOGIN_TYPE");
        } else return false;
      } catch (error) {
        console.log(error);
        if (error instanceof Error && error.message === "INVALID_LOGIN_TYPE") {
          throw new Error(
            "You have already registered with a different method."
          );
        }
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/options",
    error: "/auth/options",
    newUser: "/auth/sign-up",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import dbConnect from "@/lib/db";
import ProfileModel from "@/models/profile.model";
import UserModel from "@/models/user.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isUser =
      (user._id as string).toString() === userId ? "" : "-birthday";

    const profile = await ProfileModel.findOne({ user: userId }, isUser);
    if (!profile) {
      return Response.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Profile fetched successfully",
        data: profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

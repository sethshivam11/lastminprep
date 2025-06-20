import dbConnect from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { handleRouteError } from "@/lib/helpers";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, code } = await req.json();
    const cookieStore = await cookies();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required", success: false },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const isCodeValid = user.verifyCode === code;
    if (!isCodeValid) {
      return NextResponse.json({
        message: "Invalid code",
        success: false,
      });
    }

    const isCodeExpired = user.codeExpiry < new Date();
    if (isCodeExpired) {
      return NextResponse.json({
        message: "Code expired",
        success: false,
      });
    }

    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "30d",
      }
    );

    cookieStore.set("token", token, {
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        data: {
          email: user.email,
          fullName: user.fullName,
          isVerified: user.isVerified,
          avatar: user.avatar,
          profile: user?.profile,
          createdAt: user?.createdAt,
        },
        token,
        message: "User verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

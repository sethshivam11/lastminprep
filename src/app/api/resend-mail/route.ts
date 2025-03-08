import dbConnect from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const verifyCode = Math.floor(100_000 + Math.random() * 900_000).toString();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.verifyCode = verifyCode;
    user.codeExpiry = codeExpiry;

    await user.save();

    return NextResponse.json(
      {
        message: "Verification code sent successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
}

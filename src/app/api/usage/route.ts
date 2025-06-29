import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { countUsage, handleRouteError } from "@/lib/helpers";
import UserModel from "@/models/user.model";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "Not Authorized", data: null },
      { status: 401 }
    );
  }

  try {
    const existingUser = await UserModel.findById(user._id, "limits usage");
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found", data: null },
        { status: 404 }
      );
    }

    const usage = {
      daily: countUsage(existingUser.usage, "daily"),
      weekly: countUsage(existingUser.usage, "weekly"),
      monthly: countUsage(existingUser.usage, "monthly"),
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          limits: existingUser.limits,
          usage,
        },
        message: "User limits and usage retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

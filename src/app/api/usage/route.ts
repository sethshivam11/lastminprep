import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { handleRouteError } from "@/lib/helpers";
import UserModel from "@/models/user.model";

function countGenerationsInRange(
  generations: Date[],
  range: "daily" | "weekly" | "monthly"
): number {
  const now = new Date();
  let start: number;

  if (range === "daily") {
    start = new Date(now.setHours(0, 0, 0, 0)).getTime();
  } else if (range === "weekly") {
    const firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(now.getDate() - now.getDay());
    start = new Date(firstDayOfWeek.setHours(0, 0, 0, 0)).getTime();
  } else if (range === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  } else {
    throw new Error(`Invalid range: ${range}`);
  }

  return generations.filter((date) => date.getTime() >= start).length;
}

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
      daily: countGenerationsInRange(existingUser.usage, "daily"),
      weekly: countGenerationsInRange(existingUser.usage, "weekly"),
      monthly: countGenerationsInRange(existingUser.usage, "monthly"),
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

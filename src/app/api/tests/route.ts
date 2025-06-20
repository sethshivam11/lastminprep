import dbConnect from "@/lib/db";
import TestModel from "@/models/test.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserI } from "@/models/user.model";
import { handleRouteError } from "@/lib/helpers";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const user: UserI = session?.user as UserI;

    if (!session || !session?.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const tests = await TestModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user._id as string),
        },
      },
      {
        $lookup: {
          from: "attempts",
          localField: "_id",
          foreignField: "test",
          as: "attempts",
        },
      },
      {
        $addFields: {
          attempts: {
            $size: {
              $filter: {
                input: "$attempts",
                as: "a",
                cond: {
                  $eq: [
                    "$$a.user",
                    new mongoose.Types.ObjectId(user._id as string),
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          questions: 0,
        },
      },
    ]);

    if (!tests) {
      return NextResponse.json(
        {
          success: false,
          message: "No tests found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: tests,
        message: "Tests fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

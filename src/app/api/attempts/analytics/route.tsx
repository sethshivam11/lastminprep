import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import AttemptModel from "@/models/attempt.model";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }

  try {
    const attempts = await AttemptModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            dayOfWeek: { $dayOfWeek: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          count: 1,
          day: {
            $arrayElemAt: [
              [
                "",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              "$_id.dayOfWeek",
            ],
          },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 7,
      },
      {
        $sort: { date: 1 },
      },
    ]);

    if (!attempts || !attempts.length) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No attempts found for the user in the last 7 days.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: attempts,
        message: "Attempts analytics fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

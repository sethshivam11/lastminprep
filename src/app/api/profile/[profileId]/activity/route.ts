import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import AttemptModel from "@/models/attempt.model";
import ProfileModel from "@/models/profile.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ profileId: string }> }
) {
  const { profileId } = await params;
  if (!profileId) {
    return NextResponse.json(
      {
        success: false,
        message: "Profile ID is required",
        data: null,
      },
      { status: 400 }
    );
  }
  await dbConnect();

  try {
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return NextResponse.json(
        { success: false, data: null, message: "Profile not found" },
        { status: 404 }
      );
    }

    const activity = await AttemptModel.aggregate([
      {
        $match: {
          user: profile.user,
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

    if (!activity || activity.length === 0) {
      return NextResponse.json(
        { success: false, data: null, message: "No activity found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: activity,
        message: "Activity fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

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

    const performance = await AttemptModel.aggregate([
      {
        $match: {
          user: profile.user,
        },
      },
      {
        $addFields: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $group: {
          _id: "$date",
          averageScore: { $avg: "$totalScore" },
          score: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          averageScore: { $round: ["$averageScore", 2] },
          score: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    if (!performance || performance.length === 0) {
      return NextResponse.json(
        { success: false, data: null, message: "No analytics found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: performance,
        message: "Analytics found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

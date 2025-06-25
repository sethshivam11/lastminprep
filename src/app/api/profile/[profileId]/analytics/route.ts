import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import AttemptModel from "@/models/attempt.model";
import ProfileModel from "@/models/profile.model";
import mongoose from "mongoose";
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

    const analytics = await AttemptModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId("USER_ID_HERE"),
        },
      },
      {
        $addFields: {
          totalQuestionsPerAttempt: {
            $add: [{ $size: "$answers.mcqs" }, { $size: "$answers.coding" }],
          },
          isCompleted: {
            $gt: [
              {
                $add: [
                  { $size: "$answers.mcqs" },
                  { $size: "$answers.coding" },
                ],
              },
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalInterviews: { $sum: 1 },
          averageScore: { $avg: "$totalScore" },
          totalQuestions: { $sum: "$totalQuestionsPerAttempt" },
          completedCount: {
            $sum: { $cond: ["$isCompleted", 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalInterviews: 1,
          averageScore: { $round: ["$averageScore", 2] },
          totalQuestions: 1,
          completionRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$completedCount", "$totalInterviews"] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
    ]);
    if (!analytics || analytics.length === 0) {
      return NextResponse.json(
        { success: false, data: null, message: "No analytics found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: analytics,
        message: "Analytics found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

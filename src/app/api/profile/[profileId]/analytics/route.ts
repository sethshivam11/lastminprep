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

    const analytics = await AttemptModel.aggregate([
      {
        $match: {
          user: profile.user,
        },
      },
      {
        $addFields: {
          totalMcqs: { $size: "$answers.mcqs" },
          totalCoding: { $size: "$answers.coding" },
        },
      },
      {
        $addFields: {
          possibleScore: {
            $add: ["$totalMcqs", { $multiply: ["$totalCoding", 10] }],
          },
          isCompleted: {
            $gt: [{ $add: ["$totalMcqs", "$totalCoding"] }, 0],
          },
        },
      },
      {
        $addFields: {
          percentageScore: {
            $cond: [
              { $gt: ["$possibleScore", 0] },
              {
                $min: [
                  {
                    $multiply: [
                      { $divide: ["$totalScore", "$possibleScore"] },
                      100,
                    ],
                  },
                  100,
                ],
              },
              0,
            ],
          },
          totalQuestionsPerAttempt: {
            $add: ["$totalMcqs", "$totalCoding"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalInterviews: { $sum: 1 },
          averageScore: { $avg: "$percentageScore" },
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
          averageScore: { $round: ["$averageScore", 0] },
          totalQuestions: 1,
          completionRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$completedCount", "$totalInterviews"] },
                  100,
                ],
              },
              0,
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
        data: analytics[0],
        message: "Analytics found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

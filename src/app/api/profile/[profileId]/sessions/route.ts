import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import ProfileModel from "@/models/profile.model";
import TestModel from "@/models/test.model";
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

    const sessions = await TestModel.aggregate([
  {
    $match: {
      user: profile.user,
    },
  },
  {
    $sort: {
      createdAt: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $lookup: {
      from: "attempts",
      let: { testId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$test", "$$testId"],
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            totalScore: 1,
          },
        },
      ],
      as: "latestAttempt",
    },
  },
  {
    $addFields: {
      obtainedScore: {
        $cond: [
          { $gt: [{ $size: "$latestAttempt" }, 0] },
          { $arrayElemAt: ["$latestAttempt.totalScore", 0] },
          null,
        ],
      },
      totalPossible: {
        $add: [
          "$mcqCount",
          { $multiply: ["$codingCount", 10] }, // adjust coding weight if needed
        ],
      },
    },
  },
  {
    $addFields: {
      percentageScore: {
        $cond: [
          { $and: [{ $ne: ["$obtainedScore", null] }, { $gt: ["$totalPossible", 0] }] },
          {
            $round: [
              {
                $multiply: [
                  { $divide: ["$obtainedScore", "$totalPossible"] },
                  100,
                ],
              },
              2,
            ],
          },
          "N/A",
        ],
      },
    },
  },
  {
    $project: {
      _id: 0,
      title: "$name",
      createdAt: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
        },
      },
      score: "$percentageScore",
    },
  },
]
);

    if (!sessions || sessions.length === 0) {
      return NextResponse.json(
        { success: false, data: null, message: "No analytics found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: sessions,
        message: "Analytics found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

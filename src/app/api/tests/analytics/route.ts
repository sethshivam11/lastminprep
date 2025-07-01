import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import TestModel from "@/models/test.model";
import AttemptModel from "@/models/attempt.model";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authorized",
        data: null,
      },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(user._id);

    const difficulties = await TestModel.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          difficulty: "$_id",
          count: 1,
        },
      },
    ]);

    const attempts = await AttemptModel.aggregate([
      { $match: { user: userId } },
      {
        $project: {
          mcqCorrect: {
            $size: {
              $filter: {
                input: "$answers.mcqs",
                as: "q",
                cond: { $eq: ["$$q.correct", true] },
              },
            },
          },
          mcqIncorrect: {
            $size: {
              $filter: {
                input: "$answers.mcqs",
                as: "q",
                cond: { $eq: ["$$q.correct", false] },
              },
            },
          },
          codingCorrectMarks: {
            $sum: {
              $map: {
                input: "$answers.coding",
                as: "c",
                in: "$$c.marks",
              },
            },
          },
          codingQuestions: {
            $size: "$answers.coding",
          },
          codingIncorrect: {
            $size: {
              $filter: {
                input: "$answers.coding",
                as: "c",
                cond: { $eq: ["$$c.marks", 0] },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          correctMcq: { $sum: "$mcqCorrect" },
          incorrectMcq: { $sum: "$mcqIncorrect" },
          correctCodingMarks: { $sum: "$codingCorrectMarks" },
          codingQuestions: { $sum: "$codingQuestions" },
          incorrectCoding: { $sum: "$codingIncorrect" },
        },
      },
      {
        $addFields: {
          totalQuestions: {
            $add: ["$correctMcq", "$incorrectMcq", "$codingQuestions"],
          },
          correct: {
            $add: ["$correctMcq", { $divide: ["$correctCodingMarks", 10] }],
          },
          incorrect: { $add: ["$incorrectMcq", "$incorrectCoding"] },
        },
      },
      {
        $project: {
          _id: 0,
          correct: 1,
          incorrect: 1,
          totalQuestions: 1,
          accuracy: {
            $cond: [
              { $gt: ["$totalQuestions", 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$correct", "$totalQuestions"] },
                      100,
                    ],
                  },
                  0,
                ],
              },
              0,
            ],
          },
        },
      },
    ]);

    const analytics = {
      difficulties,
      attempts: attempts[0] || {
        correct: 0,
        incorrect: 0,
        totalQuestions: 0,
        accuracy: 0,
      },
    };

    if (!difficulties.length) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No analytics data found",
        },
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

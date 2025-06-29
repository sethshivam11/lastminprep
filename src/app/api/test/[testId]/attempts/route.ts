import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleRouteError } from "@/lib/helpers";
import AttemptModel from "@/models/attempt.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Not Authorized",
      },
      {
        status: 401,
      }
    );
  }

  const { testId } = await params;
  if (!testId) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Test ID is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const attempts = await AttemptModel.aggregate([
      { $match: { test: new mongoose.Types.ObjectId(testId) } },
      {
        $lookup: {
          from: "tests",
          localField: "test",
          foreignField: "_id",
          as: "testDetails",
        },
      },
      { $unwind: "$testDetails" },
      {
        $project: {
          user: 1,
          totalScore: 1,
          createdAt: 1,
          attemptedMcqs: {
            $size: {
              $filter: {
                input: "$answers.mcqs",
                as: "mcq",
                cond: { $ne: [{ $trim: { input: "$$mcq.answer" } }, ""] },
              },
            },
          },
          skippedMcqs: {
            $size: {
              $filter: {
                input: "$answers.mcqs",
                as: "mcq",
                cond: { $eq: [{ $trim: { input: "$$mcq.answer" } }, ""] },
              },
            },
          },
          incorrectMcqs: {
            $size: {
              $filter: {
                input: "$answers.mcqs",
                as: "mcq",
                cond: { $eq: ["$$mcq.correct", false] },
              },
            },
          },
          attemptedCoding: {
            $size: {
              $filter: {
                input: "$answers.coding",
                as: "code",
                cond: { $ne: [{ $trim: { input: "$$code.answer" } }, ""] },
              },
            },
          },
          skippedCoding: {
            $size: {
              $filter: {
                input: "$answers.coding",
                as: "code",
                cond: { $eq: [{ $trim: { input: "$$code.answer" } }, ""] },
              },
            },
          },
          maxScore: {
            $add: [
              { $multiply: [{ $size: "$testDetails.questions.mcqs" }, 1] },
              {
                $multiply: [{ $size: "$testDetails.questions.coding" }, 10],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          attempted: { $add: ["$attemptedMcqs", "$attemptedCoding"] },
          skipped: { $add: ["$skippedMcqs", "$skippedCoding"] },
          incorrect: "$incorrectMcqs",
        },
      },
      {
        $project: {
          user: 1,
          createdAt: 1,
          attempted: 1,
          skipped: 1,
          incorrect: 1,
          accuracy: 1,
          totalScore: 1,
          maxScore: 1,
        },
      },
    ]);
    if (!attempts || attempts.length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No attempts found for this test",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: attempts,
        message: "Attempts fetched successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

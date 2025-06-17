import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import AttemptModel from "@/models/attempt.model";
import TestModel from "@/models/test.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
  if (!testId) {
    return NextResponse.json(
      {
        success: false,
        message: "Test ID is required",
        data: null,
      },
      { status: 400 }
    );
  }
  await dbConnect();

  try {
    const test = await TestModel.findById(testId);
    if (!test) {
      return NextResponse.json(
        {
          success: false,
          message: "Test not found",
          data: null,
        },
        { status: 404 }
      );
    }

    const result = await AttemptModel.aggregate([
      {
        $match: {
          test: new mongoose.Types.ObjectId(testId),
        },
      },
      {
        $facet: {
          scores: [
            {
              $project: {
                _id: 0,
                codingScore: 1,
                mcqScore: 1,
              },
            },
          ],
          stats: [
            {
              $project: {
                mcqCorrect: {
                  $size: {
                    $filter: {
                      input: "$answers.mcqs",
                      as: "mcq",
                      cond: { $eq: ["$$mcq.correct", true] },
                    },
                  },
                },
                mcqTotal: { $size: "$answers.mcqs" },
                codingObtained: { $sum: "$answers.coding.marks" },
                codingTotal: { $multiply: [{ $size: "$answers.coding" }, 10] }, // 10 marks per coding question
              },
            },
            {
              $group: {
                _id: null,
                correct: {
                  $sum: { $add: ["$mcqCorrect", "$codingObtained"] },
                },
                total: {
                  $sum: { $add: ["$mcqTotal", "$codingTotal"] },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          scores: 1,
          correct: { $ifNull: [{ $arrayElemAt: ["$stats.correct", 0] }, 0] },
          total: { $ifNull: [{ $arrayElemAt: ["$stats.total", 0] }, 0] },
        },
      },
    ]);

    if (!result || !result[0] || result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No analytics data found for this test",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "Test analytics fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

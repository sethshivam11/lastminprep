import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import TestModel from "@/models/test.model";

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

    const analytics = await TestModel.aggregate([
      { $match: { user: userId } },
      {
        $facet: {
          difficulties: [
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
          ],

          attempts: [
            {
              $lookup: {
                from: "attempts",
                localField: "_id",
                foreignField: "test",
                as: "attempts",
              },
            },
            { $unwind: "$attempts" },
            { $match: { "attempts.user": userId } },
            {
              $group: {
                _id: null,
                correct: {
                  $sum: {
                    $add: [
                      {
                        $size: {
                          $filter: {
                            input: "$attempts.answers.mcqs",
                            as: "q",
                            cond: { $eq: ["$$q.correct", true] },
                          },
                        },
                      },
                      {
                        $sum: "$attempts.answers.coding.marks",
                      },
                    ],
                  },
                },
                incorrect: {
                  $sum: {
                    $add: [
                      {
                        $size: {
                          $filter: {
                            input: "$attempts.answers.mcqs",
                            as: "q",
                            cond: { $eq: ["$$q.correct", false] },
                          },
                        },
                      },
                      {
                        $size: {
                          $filter: {
                            input: "$attempts.answers.coding",
                            as: "c",
                            cond: { $eq: ["$$c.marks", 0] },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                correct: 1,
                incorrect: 1,
                accuracy: {
                  $cond: [
                    { $gt: [{ $add: ["$correct", "$incorrect"] }, 0] },
                    {
                      $round: [
                        {
                          $multiply: [
                            {
                              $divide: [
                                "$correct",
                                { $add: ["$correct", "$incorrect"] },
                              ],
                            },
                            100,
                          ],
                        },
                        2,
                      ],
                    },
                    0,
                  ],
                },
              },
            },
            {
              $replaceWith: {
                $mergeObjects: ["$$ROOT"],
              },
            },
          ],
        },
      },
      {
        $addFields: {
          attempts: {
            $arrayElemAt: ["$attempts", 0],
          },
        },
      },
    ]);

    if (
      !analytics ||
      !analytics[0] ||
      analytics.length === 0 ||
      !analytics[0]?.difficulties ||
      analytics[0].difficulties.length === 0
    ) {
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
        data: analytics[0],
        message: "Analytics found successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

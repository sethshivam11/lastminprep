import dbConnect from "@/lib/db";
import AttemptModel from "@/models/attempt.model";
import { NextRequest, NextResponse } from "next/server";
import { handleRouteError } from "@/lib/helpers";
import "@/models/test.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  await dbConnect();

  try {
    const attempt = await AttemptModel.findById(attemptId).populate({
      model: "test",
      path: "test",
      select: "language mcqCount codingCount",
      strictPopulate: false,
    });
    if (!attempt) {
      return NextResponse.json(
        {
          success: false,
          message: "Attempt not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: attempt,
        message: "Attempt fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import TestModel from "@/models/test.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
  await dbConnect();

  try {
    if (!testId) {
      return NextResponse.json(
        {
          success: false,
          message: "Test ID is required",
        },
        { status: 400 }
      );
    }

    const test = await TestModel.findById(testId, "-questions");
    if (!test) {
      return NextResponse.json(
        {
          success: false,
          message: "Test not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: test,
        message: "Test fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

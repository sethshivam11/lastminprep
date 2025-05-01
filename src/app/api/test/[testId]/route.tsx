import dbConnect from "@/lib/db";
import TestModel from "@/models/test.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
  await dbConnect();

  try {
    const searchParams = req.nextUrl.searchParams;
    const details = searchParams.get("details");

    if (!testId) {
      return NextResponse.json(
        {
          success: false,
          message: "Test ID is required",
        },
        { status: 400 }
      );
    }

    const populateQuestions =
      details === "1" ? "-codingQuestions -mcqQuestions" : "";

    const test = await TestModel.findById(testId, populateQuestions);
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
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

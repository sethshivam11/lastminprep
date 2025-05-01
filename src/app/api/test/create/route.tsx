import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { UserI } from "@/models/user.model";
import TestModel from "@/models/test.model";
import {
  codingCountSchema,
  difficultySchema,
  extraDescSchema,
  jobDescSchema,
  languageSchema,
  mcqCountSchema,
} from "@/schemas/testSchema";
import { z } from "zod";
import mongoose from "mongoose";

const testSchema = z.object({
  difficulty: difficultySchema,
  language: languageSchema,
  jobDesc: jobDescSchema,
  extraDesc: extraDescSchema,
  mcqCount: mcqCountSchema,
  codingCount: codingCountSchema,
});

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const user: UserI = session?.user as UserI;

    if (!session || !session?.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    const data = testSchema.parse(await req.json());
    const { mcqCount, codingCount, language, difficulty, jobDesc, extraDesc } =
      data;

    const test = await TestModel.create({
      name: `${language} Test`,
      user: user._id,
      difficulty,
      language,
      jobDescription: jobDesc,
      extraDescription: extraDesc,
      mcqCount,
      questions: [],
      codingCount,
    });
    if (!test) {
      return NextResponse.json(
        {
          success: false,
          message: "Test not created",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: test,
        message: "Test created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message:
            error.errors[0].message || "Error while validating test data",
          error: error.errors,
        },
        { status: 400 }
      );
    } else if (error instanceof mongoose.Error) {
      return NextResponse.json(
        {
          message: error.message || "Error while saving test data",
          error: error.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

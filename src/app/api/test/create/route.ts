import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel, { UserI } from "@/models/user.model";
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
import { countUsage, handleRouteError } from "@/lib/helpers";

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

  try {
    const existingUser = await UserModel.findById(user._id, "limits usage");
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { usage, limits } = existingUser;
    const exempted = {
      daily: limits.daily - countUsage(usage, "daily"),
      weekly: limits.weekly - countUsage(usage, "weekly"),
      monthly: limits.monthly - countUsage(usage, "monthly"),
    };

    if (exempted.daily <= 0 || exempted.weekly <= 0 || exempted.monthly <= 0) {
      const target =
        exempted.daily <= 0
          ? "Daily"
          : exempted.weekly <= 0
          ? "Weekly"
          : "Monthly";
      const message = `${target} limit exceeded`;
      const description = `You’ve reached your ${target} AI usage limit. Your limit will reset ${
        target === "Daily"
          ? "tomorrow"
          : target === "Weekly"
          ? "next week"
          : "next month"
      } at 12:00 AM UTC.`;
      return NextResponse.json(
        {
          success: false,
          data: { exempted, description },
          message,
        },
        { status: 403 }
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
      questions: {
        mcqs: [],
        coding: [],
      },
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

    await existingUser.updateOne({
      $push: { usage: new Date() },
    });

    return NextResponse.json(
      {
        success: true,
        data: test,
        message: "Test created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

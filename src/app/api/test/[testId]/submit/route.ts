import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import {
  CodingAnswer,
  countUsage,
  handleRouteError,
  MCQAnswer,
} from "@/lib/helpers";
import AttemptModel from "@/models/attempt.model";
import TestModel from "@/models/test.model";
import UserModel, { UserI } from "@/models/user.model";
import { createMistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as UserI;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const { mcqs, coding } = await req.json();
    if (!mcqs || !coding) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await UserModel.findById(user._id);
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
      }.`;
      return NextResponse.json(
        {
          success: false,
          data: { exempted, description },
          message,
        },
        { status: 403 }
      );
    }

    const test = await TestModel.findById(testId);
    if (!test) {
      return NextResponse.json(
        {
          success: false,
          message: "Test not found",
        },
        { status: 404 }
      );
    }

    if (!test.questions || test.questions.mcqs.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Test does not have questions",
        },
        { status: 400 }
      );
    }

    const prompt = `You are an expert programming evaluator. You will receive:
    - an array of coding questions, each with:
      - the question text,
      - the user's submitted answer,
      - the starter code that was provided to them
    - and a global test difficulty level: "basic", "intermediate", or "advanced"

    Your job is to evaluate each submission and give a score **out of 10**, based on the expectations of the **provided test level**.

    💡 Adjust your strictness based on the level:
    - For **basic**, give more leniency in structure and efficiency if logic is correct.
    - For **intermediate**, expect reasonable edge case handling and decent code quality.
    - For **advanced**, expect clean, optimal, and edge-aware implementations.

    🔍 Grade based on:
    - **Correctness** of the implementation  
    - **Handling of edge cases**  
    - **Code structure and readability**  
    - **Efficiency and use of optimal logic**  
    - **Adherence to the expected problem**  

    📤 Return the result as a JSON array, where each object includes:
    - \`question\`: (string) the question text  
    - \`marks\`: (integer from 0 to 10) score for the solution  
    - \`feedback\`: (string) brief constructive feedback on what’s good, missing, or needs improvement  

    ### Format:
    [
      {
        "question": "question here",
        "marks": 7,
        "feedback": "Logic is mostly correct but edge case for empty input is missing."
      },
      ...
    ]

    ### Global Difficulty Level:
    ${test.difficulty}

    ### Coding Submissions to Evaluate:
    ${JSON.stringify(coding)}

    Only return the JSON array, nothing else.`;

    const { object } = await generateObject({
      model: mistral("mistral-small-latest"),
      prompt,
      schema: z.array(
        z.object({
          question: z.string(),
          marks: z.number().min(0).max(10),
          feedback: z.string(),
        })
      ),
    });

    if (!object || !Array.isArray(object)) {
      return NextResponse.json(
        {
          success: false,
          data: object,
          message: "Failed to generate valid response",
        },
        { status: 400 }
      );
    }

    await existingUser.updateOne({
      $push: { usage: new Date() },
    });

    const mcqScore = mcqs.reduce((score: number, curr: MCQAnswer) => {
      return score + (curr.correct ? 1 : 0);
    }, 0);
    const codingScore = object.reduce((score, curr) => score + curr.marks, 0);

    const attempt = await AttemptModel.create({
      user: user._id,
      test: test._id,
      mcqScore,
      codingScore,
      answers: {
        mcqs,
        coding: coding.map((codingAnswer: CodingAnswer, index: number) => ({
          ...codingAnswer,
          ...object[index],
        })),
      },
      totalScore: mcqScore + codingScore,
    });

    if (!attempt) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save attempt",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: attempt, message: "Test submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

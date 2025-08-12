import { NextRequest, NextResponse } from "next/server";
import { createMistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel, { UserI } from "@/models/user.model";
import TestModel from "@/models/test.model";
import { handleRouteError } from "@/lib/helpers";
import { z } from "zod";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
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

    if (test.user.toString() !== (user._id as string).toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to access this test",
        },
        { status: 403 }
      );
    }

    if (test.questions && test.questions?.mcqs.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: test,
          message: "Test already has questions",
        },
        { status: 200 }
      );
    }

    const prompt = `You are an expert question paper generator. Generate exactly ${
      test.mcqCount
    } multiple choice questions and ${
      test.codingCount
    } coding questions in JSON format. Follow these strict rules:

    1. All coding questions must be written in ${test.language} language.
    2. The difficulty level for all questions must be "${test.difficulty}".
    3. Questions should be solvable within 30 minutes.
    4. Do NOT include any explanation or extra text—only return valid JSON.
    5. Format all code using proper indentation and escape characters where required.
    6. Strict formatting instructions:
        - Use the "code" key to include the code snippet relevant to the question.
          - Format the code exactly as it would appear in a code editor (e.g., properly indented, no escaped \`\\n\`).
          - If the MCQ doesn't involve code, set "code" to an empty string.
        - For Coding Questions:
          - Do not include any code or starter code for coding questions.
    7. Do not inline the code in a single line — maintain multiline formatting for readability.
    8. Escape any double quotes inside code properly using \\"
    9. Each MCQ's "options" array must contain exactly 4 unique, non-repeating, and clearly distinct choices.
    10. If two options could be interpreted as similar (e.g., "int" and "integer"), change one to make it clearly different.

    ${
      test.jobDescription
        ? `9. Base the questions on this job description: ${test.jobDescription}`
        : ""
    }
    ${
      test.extraDescription
        ? `10. Consider these extra instructions: ${test.extraDescription}`
        : ""
    }

    ### JSON Format:
    {
      "name": "<Give a suitable name to the test>",
      "difficulty": "${test.difficulty}",
      "language": "${test.language}",
      "mcqs": [
        {
          "question": "<MCQ Question>",
          "code": "<code if any>", // or empty string if not applicable
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "Option 2"
        }
        // total of ${test.mcqCount} objects
      ],
      "coding": [
        {
          "question": "<Coding question>",
          "constraints": "<Constraints if any>",
          "exampleInput": "<Example input>",
          "exampleOutput": "<Example output>",
          "code": "<Starter code if any>"
        }
        // total of ${test.codingCount} objects
      ]
    }

    Return ONLY the JSON. No text before or after.`;

    const { object } = await generateObject({
      model: mistral("mistral-small-latest"),
      prompt,
      schema: z.object({
        name: z.string(),
        mcqs: z.array(
          z.object({
            question: z.string(),
            code: z.string(),
            options: z.array(z.string()),
            answer: z.string(),
          })
        ),
        coding: z.array(
          z.object({
            question: z.string(),
            constraints: z.string().optional(),
            exampleInput: z.string().optional(),
            exampleOutput: z.string().optional(),
          })
        ),
      }),
    });

    if (!object || !object.mcqs) {
      return NextResponse.json(
        {
          success: false,
          data: object,
          message: "Failed to generate valid response",
        },
        { status: 400 }
      );
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      {
        $push: { usage: new Date() },
      },
      { new: true }
    );

    await test.updateOne({
      questions: {
        mcqs: object.mcqs,
        coding: object.coding,
      },
      name: object.name,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...test.toObject(),
          questions: {
            mcqs: object.mcqs,
            coding: object.coding,
          },
          name: object.name,
        },
        message: "Test questions generated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

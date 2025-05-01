import { NextRequest, NextResponse } from "next/server";
import { createMistral } from "@ai-sdk/mistral";
import { streamText } from "ai";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserI } from "@/models/user.model";
import TestModel from "@/models/test.model";
import mongoose from "mongoose";

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
    const test = await TestModel.findById(testId, "questions user");
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

    if (test.questions.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: test,
          message: "Test already has questions",
        },
        { status: 400 }
      );
    }

    const prompt = `Provide a name to the test and Create a list of ${
      test.mcqCount
    } multiple choice questions and ${test.codingCount} coding questions in ${
      test.language
    } language with ${
      test.difficulty
    } difficulty that can be solved in 30 minutes. ${
      test?.jobDescription &&
      `This is the job description from the company - ${test.jobDescription}`
    }. ${
      test.extraDescription &&
      `These are extra details - ${test.extraDescription}`
    }. Don't use markdown syntax for code-blocks instead wrap the code in triple exclamations '!!!' also don't use extra newline characters.
    Use the following format for your response:
    ### <Test Name> ###
    ---
    ### MCQ ###
    Question: <MCQ question>
    Codeblock (if any): <Code block> 
    Options: <Option 1>, <Option 2>, <Option 3>, <Option 4>
    Answer: <Option 1>
    ---
    ### CODING ###
    Question: <Coding question>
    Expected Input Format: <Describe input format>
    Expected Output Format: <Describe output format>
    Constraints: <Mention any constraints>
    Example Input: <Example input>
    Example Output: <Example output>
    
    Repeat the above structure for all questions. Use "###" to separate questions and "---" to separate MCQs and coding questions.`;

    const result = streamText({
      model: mistral("mistral-small-latest"),
      prompt,
      onFinish: async (data) => {
        await TestModel.findByIdAndUpdate(test._id, {
          name: data.text.split("\n")[0].trim().replaceAll("###", "").trim(),
          questions: data.text,
        });
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        {
          message: error.message || "Error while saving test data",
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Error while validating test data",
      },
      { status: 500 }
    );
  }
}

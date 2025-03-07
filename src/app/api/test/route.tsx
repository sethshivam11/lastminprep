import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  codingCountSchema,
  difficultySchema,
  extraDescSchema,
  jobDescSchema,
  languageSchema,
  mcqCountSchema,
} from "@/schemas/testSchema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserI } from "@/models/user.model";
import Test from "@/models/test.model";
import mongoose from "mongoose";

const testSchema = z.object({
  difficulty: difficultySchema,
  language: languageSchema,
  jobDesc: jobDescSchema,
  extraDesc: extraDescSchema,
  mcqCount: mcqCountSchema,
  codingCount: codingCountSchema,
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
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
    const data = testSchema.parse(await req.json());
    const { mcqCount, codingCount, language, difficulty, jobDesc, extraDesc } =
      data;

    const prompt = `Provide a name to the test and Create a list of ${mcqCount} multiple choice questions and ${codingCount} coding questions in ${language} language with ${difficulty} difficulty that can be solved in 30 minutes. ${
      jobDesc && `This is the job description from the company - ${jobDesc}`
    }. ${
      extraDesc && `These are extra details - ${extraDesc}`
    }. Don't use markdown syntax for code-blocks instead wrap the code in triple exclamations '!!!' also don't use extra newline characters.
    Use the following format for your response:
    Name
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
      model: google("gemini-1.5-flash"),
      prompt,
      onFinish: async (data) => {
        await Test.create({
          user: user._id,
          difficulty,
          language,
          jobDescription: jobDesc,
          extraDescription: extraDesc,
          mcqCount,
          codingCount,
          questions: data,
        }).catch((err) => {
          console.log(err);
          return NextResponse.json(
            {
              message: "Cannot save test",
              error: err.message,
            },
            { status: 500 }
          );
        });
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Error while validating test data",
          error: error.errors,
        },
        { status: 400 }
      );
    } else if (error instanceof mongoose.Error) {
      return NextResponse.json(
        {
          message: "Error while saving test data",
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

import { AxiosError } from "axios";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";

export const languages = ["python", "java", "cpp", "c", "javascript", "sql"];

export const difficulty = ["easy", "intermediate", "hard"];

export const mcqOptions = ["5", "10", "15", "20"];

export const codingOptions = ["0", "1", "2", "3", "4", "5"];

export type MCQQuestion = {
  question: string;
  options: string[];
  answer: string;
  codeblock?: string;
  code?: string;
};

export type CodingQuestion = {
  question: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  exampleInput?: string;
  exampleOutput?: string;
};

export interface CodingAnswer {
  question: string;
  exampleInput?: string;
  exampleOutput?: string;
  constraints?: string;
  inputFormat?: string;
  outputFormat?: string;
  answer: string;
}

export interface MCQAnswer {
  question: string;
  answer: string;
  correct: boolean;
}

type ParsedTest = {
  name: string;
  mcqs: MCQQuestion[];
  coding: CodingQuestion[];
};

export function parseTestData(
  input: string,
  isJSON: boolean = false
): ParsedTest {
  if (!input) return { name: "", mcqs: [], coding: [] };

  if (isJSON) {
    const output = JSON.parse(input);

    return {
      name: output.name,
      mcqs: output.questions.mcqs,
      coding: output.questions.coding,
    };
  }

  const mcqs: MCQQuestion[] = [];
  const coding: CodingQuestion[] = [];

  const nameMatch = input.match(/"name"\s*:\s*"([^"]*)"/);
  const name = nameMatch ? nameMatch[1] : "";

  // Match MCQs with "code" that can be empty or multiline
  const mcqRegex =
    /{\s*"question"\s*:\s*"([^"]+?)",\s*"code"\s*:\s*"((?:[^"\\]|\\.)*?)",\s*"options"\s*:\s*\[((?:\s*"[^"]*"\s*,?\s*)+)\],\s*"answer"\s*:\s*"([^"]+?)"\s*}/g;

  let match;
  while ((match = mcqRegex.exec(input))) {
    const question = match[1];
    const code = match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"');
    const optionsRaw = match[3];
    const options = optionsRaw
      .split(",")
      .map((opt) => opt.trim().replace(/^"|"$/g, ""));
    const answer = match[4];

    mcqs.push({ question, code, options, answer });
  }

  // Match coding questions with starterCode (renamed from code)
  const codingRegex =
    /{\s*"question"\s*:\s*"([^"]+?)",[^}]*?"exampleInput"\s*:\s*"([^"]*?)",\s*"exampleOutput"\s*:\s*"([^"]*?)",\s*"starterCode"\s*:\s*"((?:[^"\\]|\\.)*?)"\s*}/g;

  while ((match = codingRegex.exec(input))) {
    const question = match[1];
    const exampleInput = match[2];
    const exampleOutput = match[3];

    // Optionally match constraints if present
    const constraintsMatch = input.match(
      new RegExp(
        `"question"\\s*:\\s*"${question.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}"[\\s\\S]*?"constraints"\\s*:\\s*"([^"]*?)"`
      )
    );
    const constraints = constraintsMatch ? constraintsMatch[1] : "";

    coding.push({
      question,
      constraints,
      exampleInput,
      exampleOutput,
    });
  }

  return { name, mcqs, coding };
}

export async function generateTest(
  testId: string,
  onMessage: (chunk: string) => void
) {
  const res = await fetch(`/api/test/${testId}/questions`, {
    method: "POST",
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunk = decoder.decode(value);
    onMessage(chunk);
  }
}

export function handleRouteError(error: unknown) {
  console.log(error);
  if (error instanceof mongoose.Error) {
    return NextResponse.json(
      {
        message: error.message || "Error while saving test data",
        error: error.message,
      },
      { status: 500 }
    );
  } else if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        message: error.errors[0].message || "Error while validating test data",
        error: error.errors,
      },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { success: false, message: "Error while validating test data" },
    { status: 500 }
  );
}

export function handleError(error: unknown) {
  console.log(error);
  let message = "Something went wrong";
  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  }
  return {
    success: false,
    data: null,
    message,
  };
}

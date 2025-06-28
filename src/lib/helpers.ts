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

  try {
    if (isJSON) {
      const output = JSON.parse(input);
      return {
        name: output.name,
        mcqs: output.questions.mcqs,
        coding: output.questions.coding,
      };
    }

    const jsonBlock = input.match(/```json([\s\S]*?)```/);
    if (jsonBlock) {
      const parsed = JSON.parse(jsonBlock[1].trim());
      return {
        name: parsed.name,
        mcqs: parsed.questions.mcqs,
        coding: parsed.questions.coding,
      };
    }
  } catch (err) {
    console.warn("JSON parsing failed, falling back to regex...", err);
  }
  return {
    name: "",
    mcqs: [],
    coding: [],
  };
}

export function handleRouteError(error: unknown) {
  console.log(error);
  let message = "Internal Server Error";
  if (error instanceof z.ZodError) {
    message = error.errors[0].message;
    return NextResponse.json(
      {
        message,
        data: null,
        error: error.errors,
      },
      { status: 400 }
    );
  } else if (error instanceof mongoose.Error) {
    message = error.message;
    return NextResponse.json(
      {
        message,
        data: null,
        error: error.message,
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: false, data: null, message },
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

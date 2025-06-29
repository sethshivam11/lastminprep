import { CodingAnswer, MCQAnswer } from "@/lib/helpers";
import axios from "axios";
import { handleError } from "@/lib/helpers";

export const createTest = async (values: {
  difficulty: "easy" | "intermediate" | "hard";
  codingCount: "0" | "1" | "2" | "3" | "4" | "5";
  mcqCount: "5" | "10" | "15" | "20";
  language: "javascript" | "python" | "java" | "cpp" | "c" | "sql";
  extraDesc?: string;
  jobDesc?: string;
}) => {
  try {
    const { data } = await axios.post("/api/test/create", values);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getTest = async (testId: string) => {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/test/${testId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getQuestions = async (testId: string) => {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.post(
      `${baseUrl}/api/test/${testId}/questions`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const submitTest = async (
  testId: string,
  answers: {
    mcqs: MCQAnswer[];
    coding: CodingAnswer[];
  }
) => {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }
  try {
    const { data } = await axios.post(`/api/test/${testId}/submit`, answers);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getTestAnalytics = async (testId: string) => {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/test/${testId}/analytics`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAttempts = async (testId: string) => {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/test/${testId}/attempts`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getTests = async () => {
  try {
    const { data } = await axios.get("/api/tests");
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const testsAnalytics = async () => {
  try {
    const { data } = await axios.get("/api/tests/analytics");
    return data;
  } catch (error) {
    return handleError(error);
  }
};

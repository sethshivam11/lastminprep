import axios, { AxiosError } from "axios";

export const createTest = async (values: {
  difficulty: "easy" | "intermediate" | "hard";
  codingCount: "0" | "1" | "2" | "3";
  mcqCount: "5" | "10" | "15" | "20";
  language: "javascript" | "python" | "java" | "cpp" | "c" | "sql";
  extraDesc?: string;
  jobDesc?: string;
}) => {
  try {
    const { data } = await axios.post("/api/test/create", values);
    return data;
  } catch (error) {
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
};

export const getTest = async (id: string) => {
  if (!id) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }
  try {
    const { data } = await axios.get(`/api/test/${id}`);
    return data;
  } catch (error) {
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
};

import { handleError } from "@/lib/helpers";
import axios from "axios";

export const getAttempt = async (attemptId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/attempt/${attemptId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const attemptsActivity = async () => {
  try {
    const { data } = await axios.get("/api/attempts/activity");
    return data;
  } catch (error) {
    return handleError(error);
  }
};

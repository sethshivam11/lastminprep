import { handleError } from "@/lib/helpers";
import axios from "axios";

export const getAttempt = async (attemptId: string) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const { data } = await axios.get(`${baseUrl}/api/attempt/${attemptId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

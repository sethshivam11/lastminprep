import { handleError } from "@/lib/helpers";
import axios from "axios";

export const updateProfile = async (body: {
  fullName: string;
  birthday: Date;
  location: string;
  bio: string;
  skills: string[];
  website?: string;
  github?: string;
  x?: string;
  linkedin?: string;
}) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "";
    const { data } = await axios.post(`${baseUrl}/api/profile/save`, body);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

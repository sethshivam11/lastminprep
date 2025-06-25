import { handleError } from "@/lib/helpers";
import axios from "axios";

export const updateProfile = async (body: {
  fullName: string;
  birthday: Date;
  location: string;
  gender: string;
  bio: string;
  skills: string[];
  website?: string;
  github?: string;
  x?: string;
  linkedin?: string;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.post(`${baseUrl}/api/profile/save`, body);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfile = async (profileId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.get(`${baseUrl}/api/profile/${profileId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.get(`${baseUrl}/api/profile/user`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

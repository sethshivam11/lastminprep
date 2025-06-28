import { handleError } from "@/lib/helpers";
import axios from "axios";

export const removeAvatar = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.delete(`${baseUrl}/api/avatar`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateAvatar = async (file: File) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.post(`${baseUrl}/api/avatar`, formData);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getUsage = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
    const { data } = await axios.get(`${baseUrl}/api/usage`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

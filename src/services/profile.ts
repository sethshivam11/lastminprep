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
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.post(`${baseUrl}/api/profile/save`, body);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfile = async (profileId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/profile/${profileId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(`${baseUrl}/api/profile/user`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfileActivity = async (profileId: string) => {
  if (!profileId) {
    return {
      data: null,
      success: false,
      message: "Profile ID is required",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(
      `${baseUrl}/api/profile/${profileId}/activity`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfileAnalytics = async (profileId: string) => {
  if (!profileId) {
    return {
      data: null,
      success: false,
      message: "Profile ID is required",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(
      `${baseUrl}/api/profile/${profileId}/analytics`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfilePerformance = async (profileId: string) => {
  if (!profileId) {
    return {
      data: null,
      success: false,
      message: "Profile ID is required",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(
      `${baseUrl}/api/profile/${profileId}/performance`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProfileSessions = async (profileId: string) => {
  if (!profileId) {
    return {
      success: false,
      data: null,
      message: "Profile ID is required",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
    const { data } = await axios.get(
      `${baseUrl}/api/profile/${profileId}/sessions`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

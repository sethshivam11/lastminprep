import { DEFAULT_USER_AVATAR } from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (fileUri: string) => {
  try {
    if (!fileUri) return null;

    const response = await cloudinary.uploader.upload(fileUri, {
      resource_type: "auto",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "lastminprep",
      aspect_ratio: "1:1",
      crop: "crop",
    });

    return response;
  } catch (err) {
    console.log("Error occured while uploading to cloudinary\n", err);
  }
};

export const deleteFromCloudinary = async (cloudFileLink: string) => {
  try {
    if (!cloudFileLink) return null;

    // do not delete if default
    if (cloudFileLink === DEFAULT_USER_AVATAR) {
      return true;
    }

    const idx = cloudFileLink.indexOf("lastminprep");
    const publicId = cloudFileLink.slice(idx).split(".")[0];

    const response = await cloudinary.uploader.destroy(publicId);

    if (response?.result === "ok") return true;
  } catch (err) {
    console.log("Error occured while deleting from cloudinary\n", err);
    return false;
  }
};

export default cloudinary;

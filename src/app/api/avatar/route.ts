import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { handleRouteError } from "@/lib/helpers";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import UserModel, { DEFAULT_USER_AVATAR } from "@/models/user.model";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("avatar") as File;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    } else if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a file smaller than 50MB",
        },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const upload = await uploadToCloudinary(fileUri);

    if (upload && upload.secure_url) {
      await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { avatar: upload.secure_url } },
        { new: true }
      );

      if (user.avatar.includes("res.cloudinary.com")) {
        await deleteFromCloudinary(user.avatar);
      }

      return NextResponse.json(
        {
          success: true,
          data: { avatar: upload.secure_url },
          message: "Avatar updated successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, data: null, message: "Failed to update profile image" },
      { status: 400 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }

  try {
    if (user.avatar.includes("res.cloudinary.com")) {
      await deleteFromCloudinary(user.avatar);
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      { $set: { avatar: DEFAULT_USER_AVATAR } },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        data: { avatar: DEFAULT_USER_AVATAR },
        message: "Avatar removed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

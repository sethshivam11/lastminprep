import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { handleRouteError } from "@/lib/helpers";
import ProfileModel from "@/models/profile.model";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ profileId: string }> }
) {
  const { profileId } = await params;
  if (!profileId) {
    return NextResponse.json(
      {
        success: false,
        message: "Profile ID is required",
        data: null,
      },
      { status: 400 }
    );
  }

  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  try {
    const profile = await ProfileModel.findById(profileId).populate({
      model: "user",
      path: "user",
      select: "fullName avatar",
      strictPopulate: false,
    });
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
          data: null,
        },
        { status: 404 }
      );
    }

    const isUser = profile.user.toString() === user?._id.toString();
    const data = {
      ...profile.toObject(),
      birthday: isUser ? profile.birthday : null,
    };

    return NextResponse.json({
      success: true,
      data,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

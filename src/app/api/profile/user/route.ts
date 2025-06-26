import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import ProfileModel from "@/models/profile.model";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
        data: null,
      },
      { status: 401 }
    );
  }

  try {
    const profile = await ProfileModel.findOne({ user: user._id });
    if (!profile) {
      return Response.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Profile fetched successfully",
        data: profile,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

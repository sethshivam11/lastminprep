import dbConnect from "@/lib/db";
import { handleRouteError } from "@/lib/helpers";
import ProfileModel from "@/models/profile.model";
import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
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
    const {
      fullName,
      birthday,
      location,
      bio,
      skills,
      website,
      github,
      linkedin,
      x,
    } = await req.json();
    if (
      !fullName ||
      !birthday ||
      !location ||
      !bio ||
      !skills ||
      skills.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Some required fields are missing or invalid.",
          data: null,
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findById(user._id, "profile");
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          data: null,
        },
        { status: 404 }
      );
    }

    if (existingUser.fullName !== fullName) {
      await existingUser.updateOne({ fullName });
    }

    if (existingUser.profile) {
      const existingProfile = await ProfileModel.findById(existingUser.profile);
      if (!existingProfile) {
        await existingUser.updateOne({ profile: null });
        return NextResponse.json(
          {
            success: false,
            message: "Profile not found, Please try again",
            data: null,
          },
          {
            status: 404,
          }
        );
      }

      existingProfile.birthday = birthday;
      existingProfile.location = location;
      existingProfile.bio = bio;
      existingProfile.skills = skills;
      existingProfile.social = {
        website,
        github,
        linkedin,
        x,
      };

      await existingProfile.save();

      return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        data: existingProfile,
      });
    }

    const profile = await ProfileModel.create({
      user: user._id,
      birthday,
      location,
      bio,
      skills,
      social: {
        website,
        github,
        linkedin,
        x,
      },
    });
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create profile",
          data: null,
        },
        { status: 400 }
      );
    }

    await existingUser.updateOne({ profile: profile._id });

    return NextResponse.json(
      {
        success: true,
        message: "Profile created successfully",
        data: profile,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

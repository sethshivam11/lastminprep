import { NextResponse } from "next/server";
import { handleRouteError } from "@/lib/helpers";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "Not Authorized", data: null },
      { status: 401 }
    );
  }

  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token cannot be generated",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token generated successfully",
        data: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleRouteError(error);
  }
}

import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { handleRouteError } from "@/lib/helpers";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authorized",
        data: null,
      },
      { status: 401 }
    );
  }

  try {
    const { requestedLimits, reason, notes } = await req.json();
    if (!requestedLimits || !reason) {
      return NextResponse.json(
        {
          success: false,
          message: "Requested limits and reason are required",
          data: null,
        },
        { status: 400 }
      );
    }

    await sendEmail({
      to: process.env.FEEDBACK_EMAIL || "",
      subject: "Feedback from LastMinPrep",
      text: `User: ${user.fullName} (${
        user.email
      })\nRequested Limits: <strong>${requestedLimits}\nReason: ${reason}\nNotes: ${
        notes || "N/A"
      }`,
      html: `<p>User: <strong>${user.fullName}</strong> (<a href="mailto:${
        user.email
      }">${user.email}</a>)</p>
               <p>Requested Limits: <strong>${requestedLimits}</strong></p>
               <p>Reason: <strong>${reason}</strong></p>
               <p>Notes: <strong>${notes ?? "N/A"}</strong></p>`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}

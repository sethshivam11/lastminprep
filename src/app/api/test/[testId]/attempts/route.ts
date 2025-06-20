import { handleRouteError } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const testId = await params;
  if (!testId) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Test ID is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
  } catch (error) {
    return handleRouteError(error);
  }
}

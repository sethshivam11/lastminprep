import dbConnect from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/mailer";
import { mail, mailText } from "@/lib/mail";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, fullName, password } = await req.json();

    const existingUser = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100_000 + Math.random() * 900_000).toString();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          {
            message: "User already exists with this email",
            success: false,
          },
          { status: 400 }
        );
      } else {
        existingUser.fullName = fullName;
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.codeExpiry = codeExpiry;
        await existingUser.save();
      }
    } else {
      const user = await UserModel.create({
        email,
        fullName,
        password: hashedPassword,
        verifyCode,
        codeExpiry,
      });
      if (!user) {
        return NextResponse.json(
          {
            message: "Failed to create user",
            success: false,
          },
          { status: 400 }
        );
      }
    }

    await sendEmail({
      to: email,
      subject: "Verify your email",
      text: mailText(verifyCode),
      html: mail(verifyCode),
    });

    return NextResponse.json(
      {
        data: { email, fullName },
        message: "User created successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/userSchema";
import { EmailType } from "@/utils/appConstants";
import { sendEmail } from "@/helpers/mailer";

connectToDB();

const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    const isUser = await User.findOne({
      email,
    });

    if (isUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("New user created: ", newUser);

    //send the verification email to user
    await sendEmail(email, EmailType.VERIFY_TOKEN, newUser._id)

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log("Error in createUser: ", error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export { POST };

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/userSchema";

connectToDB();

const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const isUser = await User.findOne({
      email,
    });

    if (!isUser) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        {
          status: 400,
        }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }

    //create a paylaod
    const payLoad = {
      id: isUser._id,
      username: isUser.username,
      email: isUser.email,
    };

    //create a token
    const token = await jwt.sign(payLoad, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log("Error in loginUser: ", error);

    if (error instanceof Error) {
      // TypeScript now knows this is a general Error object
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    } else {
      // Handle unexpected error structures
      console.error("Unexpected error ->", error);
      return NextResponse.json(
        {
          message: "An unexpected error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
};

export { POST };

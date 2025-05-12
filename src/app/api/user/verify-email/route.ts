import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    //check if the token is valid

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired token",
        },
        {
          status: 400,
        }
      );
    }

    console.log("User found -> ", user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in verifyEmaill -> ", error);
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

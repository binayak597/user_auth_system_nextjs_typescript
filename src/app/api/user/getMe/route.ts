import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/userSchema";
import extractDataFromToken from "@/helpers/extractDataFromToken";

connectToDB();

const GET = async (request: NextRequest) => {
  try {
    const userId = await extractDataFromToken(request);

    console.log(userId);

    const isUser = await User.findById(userId).select(
      "-password -isAdmin -isVerified -__v"
    );

    return NextResponse.json(
      {
        message: "User found",
        status: true,
        user: isUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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

export { GET };

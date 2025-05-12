import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
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

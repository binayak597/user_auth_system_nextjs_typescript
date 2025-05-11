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
  } catch (error: any) {
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

export { GET };

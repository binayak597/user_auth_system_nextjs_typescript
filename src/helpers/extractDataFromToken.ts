import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";


interface DecodedTokenData extends JwtPayload {
  id: string;
}

const extractDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("authToken")?.value || "";

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedTokenData = await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )as DecodedTokenData

    return decodedTokenData.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error("Unexpected error ->", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export default extractDataFromToken;

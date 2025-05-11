import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const extractDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("authToken")?.value || "";

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedTokenData: any = await jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    return decodedTokenData.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default extractDataFromToken;

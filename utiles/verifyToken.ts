

import { NextRequest } from "next/server";
import { TjwtPayload } from "./type";
import jwt from "jsonwebtoken";


//verify token for api endpoint
export function verifyToken(request: NextRequest): TjwtPayload | null {
  try {
    const token = request.cookies.get("tokenCookie")?.value as string;
    if (!token) return null;
    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TjwtPayload;
    return userPayload;
  } catch {
    return null;
  }
}

//verify token for page
export function verifyTokenForPage(token: string): TjwtPayload | null {
  try {
    const userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TjwtPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch {
    return null;
  }
}

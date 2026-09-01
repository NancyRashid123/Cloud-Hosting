import { JwtPayload } from './../node_modules/@types/jsonwebtoken/index.d';
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

// generate token
export function generateToken(JwtPayload:JwtPayload) :string {
    const privateKey = process.env.JWT_SECRET as string
    const token = jwt.sign(JwtPayload,privateKey,{expiresIn:"30d"});
    return token
}

//set cookie
export function setCookie(jwtPayload:JwtPayload) : string{
     const token = generateToken(jwtPayload);
       const tokenCookie = cookie.stringifySetCookie({
         name: "tokenCookie",
         value: token,
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         path: "/",
         maxAge: 60 * 60 * 24 * 30,
       });
    return tokenCookie;
  }
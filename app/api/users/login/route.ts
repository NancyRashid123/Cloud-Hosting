import { LoginUserDto } from "@/utiles/dto";
import { setCookie } from "@/utiles/generateToken";
import prisma from "@/utiles/lib/prisma";
import { LoginUserSchema } from "@/utiles/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const loginValidation = LoginUserSchema.safeParse(body);
    if (!loginValidation.success)
      return NextResponse.json(
        { message: loginValidation.error.issues[0].message },
        { status: 400 },
      );
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user)
      return NextResponse.json(
        { message: "user not found, please register first" },
        { status: 404 },
      );
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "invalid password" },
        { status: 401 },
      );
    
    const tokenCookie = setCookie( {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
    return NextResponse.json(
      { message: "Authenticated" },
      {
        status: 200,
        headers: {
          "Set-Cookie": tokenCookie,
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

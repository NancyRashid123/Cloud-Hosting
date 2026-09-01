import prisma from "@/utiles/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json(count, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}
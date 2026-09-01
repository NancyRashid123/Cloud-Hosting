/**
 * @method Get
 * @route /api/articles/search
 * @description search article by searchText
 * @access public
 */

import prisma from "@/utiles/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText") as string;
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: { contains: searchText, mode: "insensitive" },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

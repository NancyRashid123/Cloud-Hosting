import { Article } from "@/app/generated/prisma/client";
import { ARTICLE_PER_PAGE } from "@/utiles/constantes";
import { CreateArticleDto } from "@/utiles/dto";
import prisma from "@/utiles/lib/prisma";
import { createArticleSchema } from "@/utiles/validationSchema";
import { verifyToken } from "@/utiles/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route /api/articles
 * @description get articles by pageNumber
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "'internal server error'" },
      { status: 500 },
    );
  }
}

/**
 * @method POST
 * @route /api/articles
 * @description create article
 * @access private(only admin can access)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user == null || !user.isAdmin)
        { return NextResponse.json(
            { message: "only admin can create article" },
            { status: 403 },
        );
    }
    const body = (await request.json()) as CreateArticleDto;

    const parsedBody = createArticleSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(parsedBody.error.issues[0].message, {
        status: 400,
      });
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "'internal server error'" },
      { status: 500 },
    );
  }
}

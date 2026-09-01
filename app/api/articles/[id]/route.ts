import { UpdateArticleDto } from "@/utiles/dto";
import prisma from "@/utiles/lib/prisma";
import { updateArticleSchema } from "@/utiles/validationSchema";
import { verifyToken } from "@/utiles/verifyToken";

import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const articleId = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!articleId)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    return NextResponse.json(articleId, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method PUT
 * @route /api/articles/:id
 * @description update article
 * @access private(only admin can access)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user == null || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin can create article" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const data = (await request.json()) as UpdateArticleDto;
    console.log(data);
    const updateValidation = updateArticleSchema.safeParse(data);
    if (!updateValidation.success)
      return NextResponse.json(
        {
          message: updateValidation.error.issues[0].message,
        },
        { status: 400 },
      );

    const articleId = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!articleId)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: updateValidation.data.title,
        description: updateValidation.data.description,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 * @method DELETE
 * @route /api/articles/:id
 * @description delete article
 * @access private (only admin can access)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user == null || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin can create article" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const articleId = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: true
      }
    });
    if (!articleId)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    await prisma.article.delete({ where: { id: parseInt(id) } });
    const commentIds : number[] = articleId?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

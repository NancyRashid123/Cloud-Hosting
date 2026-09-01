
import { CreateCommentDto } from "@/utiles/dto";
import prisma from "@/utiles/lib/prisma";
import { createCommentSchema } from "@/utiles/validationSchema";
import { verifyToken } from "@/utiles/verifyToken";
import { NextRequest, NextResponse } from "next/server";
/**
 * @method Post
 * @route /api/comments
 * @description create comment
 * @access public
 */


export async function POST(request:NextRequest) {
    try{
       const user = verifyToken(request);
       if(!user) return NextResponse.json({message:"only logged in users can create comments"},{status:401});
       const body = (await request.json()) as CreateCommentDto;
       const validation = createCommentSchema.safeParse(body);
       if (!validation.success) return NextResponse.json({message:validation.error.issues[0].message},{status:400});
       const comment = await prisma.comment.create({data:{text:validation.data.text,userId:user.id,articleId:validation.data.articleId}});
       return NextResponse.json(comment,{status:201});
    }
    catch{
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}


/**
 * @method Get
 * @route /api/comments
 * @description get all comment
 * @access private(only admin can access)
 */

export async function GET(request:NextRequest) {
    try{
       const user = verifyToken(request);
       if(user == null || !user.isAdmin) return NextResponse.json({message:"only admin can access"},{status:403});
       const comment = await prisma.comment.findMany();
       return NextResponse.json(comment,{status:200});
    }
    catch{
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}

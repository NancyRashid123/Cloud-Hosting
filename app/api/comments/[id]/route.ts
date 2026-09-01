
import { UpdateCommentDto } from "@/utiles/dto";
import prisma from "@/utiles/lib/prisma";
import { verifyToken } from "@/utiles/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PUT
 * @route /api/comments/:id
 * @description update comment
 * @access private
 */

interface Props {
  params: Promise<{
    id: string;
  }>;
}
export async function PUT(request:NextRequest,{params}:Props) {
    try{
        const {id} = await params;
        const comment = await prisma.comment.findUnique({where:{id:parseInt(id)}});
        if(!comment) return NextResponse.json({message:"comment not found"},{status:404});
        const user = verifyToken(request);
        if(user === null || user.id !== comment.userId) return NextResponse.json({message:"only user himself can update, forbidden"},{status:403});
        const body = (await request.json()) as UpdateCommentDto;
        const updatedComment = await prisma.comment.update({where:{id:parseInt(id)},data:{text:body.text}})
        return NextResponse.json(updatedComment,{status:200});
    }
    catch{
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}


/**
 * @method DELETE
 * @route /api/comments/:id
 * @description delete comment
 * @access private (admin or owner of comment)
 */


export async function DELETE(request:NextRequest,{params}:Props) {
    try{
        const {id} = await params;
        const comment = await prisma.comment.findUnique({where:{id:parseInt(id)}});
        if(!comment) return NextResponse.json({message:"comment not found"},{status:404});
        const user = verifyToken(request);
        if(!user) return NextResponse.json({message:"no token found, forbidden"},{status:403});
        if(user.isAdmin || user.id === comment.userId){
            await prisma.comment.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:"comment deleted successfully"},{status:200});
        }
        return NextResponse.json({message:"you are not allowed to access this"},{status:403});
    }
    catch{
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}
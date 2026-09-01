import prisma from "@/utiles/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utiles/verifyToken";
import bcrypt from "bcryptjs";
import { UpdateUserDto } from "@/utiles/dto";
import { updateUserSchema } from "@/utiles/validationSchema";

/**
 * @method Delete
 * @route /api/users/profile/:id
 * @description delete user
 * @access private
 */

interface Props{ params: Promise<{
    id: string;
  }>;}

export async function DELETE(request:NextRequest,{params}:Props) {
   try{
      const {id} = await params;
      const user = await prisma.user.findUnique({where:{id:parseInt(id)},
    include:{comments:true}});
    if(!user){
        return NextResponse.json({message:"user not found"},{status:404});
}
    
    
    const userFromToken = verifyToken(request);
   
    
   if(userFromToken!== null && userFromToken.id === user.id) {
    await prisma.user.delete({where:{id:parseInt(id)}});
     const commentIds : number[] = user?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
    return NextResponse.json({message:"user deleted successfully"},{status:200});
   }

    return NextResponse.json({message:"only user himself can delete, forbidden"},{status:403});
   } catch (error) {
    return NextResponse.json({message:error},{status:500})
   }
}


/**
 * @method GET
 * @route /api/users/profile/:id
 * @description get profile
 * @access private
 */

export async function GET(request:NextRequest,{params}:Props) {
   try{
      const {id} = await params;
      const user = await prisma.user.findUnique({where:{id:parseInt(id)},select:{id : true,username:true,email:true , createdAt:true , isAdmin:true}});
    if(!user){
        return NextResponse.json({message:"user not found"},{status:404});
}
    const userFromToken = verifyToken(request);
    if(userFromToken == null || userFromToken.id !== user.id) {
        return NextResponse.json({message:"you are not allowed to access this"},{status:403});
    }
    return NextResponse.json(user,{status:200});
   } catch (error) {
    return NextResponse.json({message:error},{status:500})
   }  
}


/**
 * @method PUT
 * @route /api/users/profile/:id
 * @description update profile
 * @access private
 */


export async function PUT(request:NextRequest,{params}:Props) {
    try{
        const {id} = await params;
      const user = await prisma.user.findUnique({where:{id:parseInt(id)}});
      if(!user) return NextResponse.json({message:"user not found"},{status:404});
      const userFromToken = verifyToken(request);
      if(userFromToken == null || userFromToken.id !== user.id) {
        return NextResponse.json({message:"you are not allowed to access this"},{status:403});
      }
      const body = (await request.json() )as UpdateUserDto;
      const updateValidation = updateUserSchema.safeParse(body);
      if(!updateValidation.success) return NextResponse.json({message:updateValidation.error.issues[0].message},{status:400});
      if(body.password ){
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password,salt);
        }
      const updatedUser =  await prisma.user.update({where:{id:parseInt(id)},data:{
            username:body.username,
            email:body.email,
            password:body.password
        }});
        const{password ,...rest} = updatedUser;
      return NextResponse.json({...rest},{status:200});
    }
    catch(error){
      return NextResponse.json({message:error},{status:500})
    }
}




import { CreateUserDto } from '@/utiles/dto';
import { setCookie } from '@/utiles/generateToken';
import prisma from '@/utiles/lib/prisma';

import { createUserSchema } from '@/utiles/validationSchema';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request:NextRequest){
   try {
     const body =  await (request.json())as CreateUserDto;
    const userValidation = createUserSchema.safeParse(body);
    if(!userValidation.success) return NextResponse.json({message:userValidation.error.issues[0].message},{status:400})
    const user = await prisma.user.findUnique({where:{email:userValidation.data.email}});
    if(user) return NextResponse.json({message:"user already exists"},{status:400});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userValidation.data.password,salt);
    const newUser = await prisma.user.create({data:
        {
            username:userValidation.data.username,
            email:userValidation.data.email,
            password:hashedPassword
        }
    });

    const tokenCookie = setCookie( {
         id: newUser.id,
         username: newUser.username,
         isAdmin: newUser.isAdmin,
       });
    return NextResponse.json({...newUser,message:"user created successfully"},{status:201
        ,headers: {
            'Set-Cookie': tokenCookie,
          },
    });
   } catch (error) {
    return NextResponse.json({message:error},{status:500})
   }
}
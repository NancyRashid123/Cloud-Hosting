import { Comment } from "@/app/generated/prisma/client";
import { domain } from "@/utiles/constantes";


export const  getAllComments = async (token: string) : Promise<Comment[]> =>  {
     const res = await fetch(`${domain}/api/comments` , 
        {headers: {
      Cookie: `tokenCookie=${token}`
    }
        }
       );
       if(!res.ok) throw new Error("Failed to fetch data");
    
      return  await res.json();
 
}

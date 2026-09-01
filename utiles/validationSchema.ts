
import z from "zod";

//create article
 export const createArticleSchema = z.object({
        title:z.string().min(2,"Title must be at least 2 characters").max(50),
        description:z.string().min(5)
    })

//update article    
 export const updateArticleSchema = z.object({
        title:z.string().min(2,"Title must be at least 2 characters").max(50),
        description:z.string().min(5)
    })

 //create user   
 export const createUserSchema = z.object({
        username:z.string().min(2,"Title must be at least 2 characters"),
        email:z.string().email(),
        password:z.string().min(6)
    })

 //login user   
 export const LoginUserSchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })
 // Create Comment   
 export const createCommentSchema = z.object({
        text:z.string().min(2).max(500),
        articleId:z.number()
    })


// update user
    export const updateUserSchema = z.object({
        username:z.string().min(2,"Title must be at least 2 characters").optional(),
        email:z.string().email().optional(),
        password:z.string().min(6).optional()
    })
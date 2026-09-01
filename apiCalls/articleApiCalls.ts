import {  SingleArticle } from './../utiles/type';
import { Article } from "@/app/generated/prisma/client";
import { domain } from "@/utiles/constantes";


//get all articles by pageNumber
export const getArticles = async (pageNumber:string ) : Promise<Article[]> => {
    const res = await fetch(`${domain}/api/articles?pageNumber=${pageNumber}` , {cache:"no-store"});
 if(!res.ok) throw new Error("Failed to fetch data");
 return await res.json();
 }

 //get count
export const getArticlescount = async () : Promise<number> => {
    const res = await fetch(`${domain}/api/articles/count` , {cache:"no-store"});
 if(!res.ok) throw new Error("Failed to get count");
 const count = await res.json();
 return count;
 }


 //get  articles based on searchText
export const getArticlesBySearch = async (searchText:string) : Promise<Article[]> => {
 const res = await fetch(`${domain}/api/articles/search?searchText=${searchText}` , {cache:"no-store"});
 if(!res.ok) throw new Error("Failed to fetch data");
 return await res.json();
 }


 //get article by id
 export const getArticleById = async (articleId:string) : Promise<SingleArticle> => {
 const res = await fetch(`${domain}/api/articles/${articleId}`,{cache:"no-store"});
 if(!res.ok) throw new Error("Failed to fetch data");
 return res.json();
 }
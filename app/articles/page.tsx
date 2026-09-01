import ArticleItem from "@/components/article/articleItem";
import Pagination from "@/components/pagination/Pagination";
import Search from "@/components/search/Search";
import { getArticles } from "@/apiCalls/articleApiCalls";
import { Article } from "../generated/prisma/client";
import { ARTICLE_PER_PAGE } from "@/utiles/constantes";
import prisma from "@/utiles/lib/prisma";

interface ArticlePageProps {
  searchParams: Promise<{ pageNumber?: string }>
}

export default async function  ArticlesPage({searchParams}:ArticlePageProps) {
  const { pageNumber } = await searchParams;
  const posts:Article[] = await getArticles(pageNumber || "1");
  const count:number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
   <div className="min-h-dvh ">
  <div className="container m-auto px-4 py-10 flex flex-col gap-8">
    <Search />
    <ArticleItem posts={posts} />
    <Pagination pageNumber={parseInt(pageNumber || "1") } route="/articles" pages={pages}/>
  </div>
</div>
  )
}

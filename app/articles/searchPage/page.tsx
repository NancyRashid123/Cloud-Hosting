import { getArticlesBySearch } from "@/apiCalls/articleApiCalls";
import { Article } from "@/app/generated/prisma/client";
import ArticleItem from "@/components/article/articleItem";
import Link from "next/link";

interface searchPageProps{
   searchParams:Promise<{ search?: string }>
}
export  default async function SearchPage({searchParams}:searchPageProps) {
    const { search } = await searchParams;
    const articles:Article[] = await getArticlesBySearch(search || "");
 return (
  <section className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Search Results
        </p>

        <h1 className="text-3xl font-bold text-gray-800">
          Results for{" "}
          <span className="text-blue-600">{search}</span>
        </h1>

        <p className="mt-2 text-gray-500">
          {articles.length} article{articles.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Articles */}
      {articles.length > 0 ? (
        <ArticleItem posts={articles} />
      ) : (
        <div className="flex py-10 flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700">
            No articles found
          </h2>

          <p className="mt-2 text-gray-500">
            We cannot find any articles matching {search}.
          </p>

          <Link
            href="/articles"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Browse All Articles
          </Link>
        </div>
      )}
    </div>
  </section>
);
}

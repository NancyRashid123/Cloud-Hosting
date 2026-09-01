import { getArticles } from "@/apiCalls/articleApiCalls";
import { Article } from "@/app/generated/prisma/client";
import Pagination from "@/components/pagination/Pagination";
import { ARTICLE_PER_PAGE } from "@/utiles/constantes";
import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiPlus,  FiEdit2} from "react-icons/fi";
import DeleteArticleButton from "./deleteButton/DeleteArticleButton";
import prisma from "@/utiles/lib/prisma";


interface ArticleTableProps {
  searchParams: Promise<{ pageNumber?: string }>;
}


export default async function ArticlesPage({
  searchParams,
}: ArticleTableProps ) {
 
  const { pageNumber } = await searchParams;
  const cookieStore = await cookies();
  const token = (cookieStore.get("tokenCookie")?.value as string) || "";
  if (!token) return redirect("/");
  const payload = verifyTokenForPage(token);
  if (!payload?.isAdmin) return redirect("/");
  const count = await prisma.article.count();
 const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  const articles: Article[] = await getArticles(pageNumber || "1");
  return (
    <main className="min-h-screen">
      {articles.length > 0 ? (
         <div className="container m-auto px-4 py-10 flex flex-col gap-8">
        {/* Header */}
        <div className=" flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Articles
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your articles and create new content.
            </p>
          </div>

          <Link
            href="/admin/articles/addArticle"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <FiPlus className="text-xl" />
            Add Article
          </Link>
        </div>

        {/* Articles Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto" >
            <table className="w-full min-w-175 text-left">
              {/* Table Header */}
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Title
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Created At
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Updated At
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="transition hover:bg-blue-50/40"
                  >
                    {/* Title */}
                    <td className="px-6 py-5">
                      <div className="max-w-sm">
                        <h3 className="truncate font-semibold text-gray-800">
                          {article.title}
                        </h3>

                        <span className="text-xs text-gray-400">
                          Article #{article.id}
                        </span>
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>

                    {/* Updated At */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        {/* Read More */}
                        <Link
                          href={`/articles/${article.id}`}
                          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-100 hover:text-blue-600"
                        >
                          Read More
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          title="Edit Article"
                        >
                          <FiEdit2 />
                        </Link>

                        {/* Delete */}
                        <DeleteArticleButton articleId={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          pageNumber={parseInt(pageNumber || "1")}
          route="/admin/articles"
          pages={pages}
        />
      </div> ) : (
        <div className="container m-auto px-4 py-10 flex justify-between ">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            No articles found
          </h1>
          <Link
            href="/admin/articles/addArticle"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <FiPlus className="text-xl" />
            Add Article
          </Link>
        </div>
      )
      }
    </main>
  );
}

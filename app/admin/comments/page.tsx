import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { Comment } from "@/app/generated/prisma/client";
import { getAllComments } from "@/apiCalls/adminApiCalls";
import DeleteCommentButton from "./deleteCommentButton/DeleteCommentButton";

export default async function CommentsTable() {
  const cookieStore = await cookies();
  const token = (cookieStore.get("tokenCookie")?.value as string) || "";
  if (!token) return redirect("/");
  const payload = verifyTokenForPage(token);
  if (!payload?.isAdmin) return redirect("/");

  const comments: Comment[] = await getAllComments(token);
  return (
    <main className="min-h-screen  p-6 md:p-8">
      {comments.length > 0 ? (
        <div className="container m-auto px-4 py-10 flex flex-col gap-8">
          {/* Header */}
          <div className=" flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Comments
              </h1>
            </div>
          </div>

          {/* Articles Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
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
                      ArticleId
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {comments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      {/* Title */}
                      <td className="px-6 py-5">
                        <div className="max-w-sm">
                          <h3 className="truncate font-semibold text-gray-800">
                            {comment.text}
                          </h3>
                        </div>
                      </td>

                      {/* Created At */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
                        {comment.articleId}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {/* Delete */}
                          <DeleteCommentButton commentId={comment.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="container m-auto px-4 py-10 flex flex-col gap-8">
          {/* Header */}
          <div className=" flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                No comments
              </h1>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

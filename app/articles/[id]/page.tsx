import { getArticleById } from "@/apiCalls/articleApiCalls";
import AddComment from "@/components/addComment/AddComment";
import CommentItem from "@/components/commentItem/CommentItem";
import { SingleArticle } from "@/utiles/type";
import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";

interface SingleArticleProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleArticlePage({
  params,
}: SingleArticleProps) {
  const { id } = await params;

  const article: SingleArticle = await getArticleById(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenCookie")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* ================= Article ================= */}
        <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl md:p-10">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Article #{article.id}
          </span>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-800 md:text-4xl">
            {article.title}
          </h1>

          <div className="my-6 h-px bg-gray-100" />

          <p className="text-base leading-8 text-gray-600 md:text-lg">
            {article.description}
          </p>
        </article>

        {/* ================= Comments ================= */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-xl md:p-8">
          {/* Comments Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FiMessageCircle className="text-xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">Comments</h2>

                <p className="text-sm text-gray-400">Join the discussion</p>
              </div>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
              {article.comments.length}
            </span>
          </div>

          {/* Add Comment */}
          {payload ? (
            <AddComment articleId={article.id} />
          ) : (
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
              <p className="text-sm text-gray-600">
                You need to login to add a comment.
              </p>

              <Link
                href="/login"
                className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div>
            {article.comments.length > 0 ? (
              article.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
              ))
            ) : (
              <div className="py-10 text-center">
                <FiMessageCircle className="mx-auto mb-3 text-4xl text-gray-300" />

                <p className="font-medium text-gray-500">No comments yet</p>

                <p className="mt-1 text-sm text-gray-400">
                  Be the first one to comment!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

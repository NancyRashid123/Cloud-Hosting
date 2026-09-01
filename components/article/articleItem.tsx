import Link from "next/link";
import { Article } from "@/app/generated/prisma/client";

interface ArticleItemProps {
  posts: Article[];
}

export default function ArticleItem({ posts }: ArticleItemProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
  <div
    key={post.id}
    className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
  >
    <div className="h-2 bg-linear-to-r from-sky-500 to-blue-600"></div>

    <div className="flex h-full flex-col p-6">
      <h2 className="line-clamp-2 text-2xl font-bold text-gray-800 transition group-hover:text-blue-600">
        {post.title}
      </h2>

      <p className="mt-4 flex-1 leading-7 text-gray-500 line-clamp-4">
        {post.description}
      </p>

      <Link
        href={`/articles/${post.id}`}
        className="mt-6 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300"
      >
        Read More →
      </Link>
    </div>
  </div>
))}
    </div>
  );
}
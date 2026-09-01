import { getArticleById } from "@/apiCalls/articleApiCalls"
import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";
import { SingleArticle } from "@/utiles/type";

interface EditArticlePageProps {
    params: { id: string };
}
export default async function EditArticlePage({params}:EditArticlePageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
      const token = (cookieStore.get("tokenCookie")?.value as string) || "";
      if (!token) return redirect("/");
      const payload = verifyTokenForPage(token);
      if (!payload?.isAdmin) return redirect("/"); 
      const article: SingleArticle = await getArticleById(id);
  return (
    <main className="min-h-screen p-6 md:p-8">
          <div className="container m-auto px-4 py-10 flex flex-col gap-8">
            <EditArticleForm article={article} />
          </div>
        </main>
  )
}

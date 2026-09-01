import AddArticleForm from "@/components/addAticleForm/AddArticleForm";
import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function AddArticlePage() {
   const cookieStore =await cookies();
    const token = cookieStore.get("tokenCookie")?.value as string || "";
    if(!token) return redirect("/");
    const payload = verifyTokenForPage(token);
    if(!payload?.isAdmin) return redirect("/");
  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="container m-auto px-4 py-10 flex flex-col gap-8">
        <AddArticleForm />
      </div>
    </main>
  );
}
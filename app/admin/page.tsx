import { verifyTokenForPage } from "@/utiles/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function AdminPage() {
  const cookieStore =await cookies();
  const token = cookieStore.get("tokenCookie")?.value as string || "";
  if(!token) return redirect("/");
  const payload = verifyTokenForPage(token);
  if(!payload?.isAdmin) return redirect("/");
  return (
    <main className="min-h-screen  p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 md:text-4xl">
          Dashboard
        </h1>
      </div>
    </main>
  );
}
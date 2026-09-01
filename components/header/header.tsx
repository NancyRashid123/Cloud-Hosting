

import Navbar from "../navbar/navbar";
import Button from "../button/Button";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utiles/verifyToken";

export default async function Header() {
  const cookieStore = await cookies();

  const token = cookieStore.get("tokenCookie")?.value || "";
  const payload = verifyTokenForPage(token);

  const user = payload
    ? {
        username: payload.username,
        isAdmin: payload.isAdmin,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex min-h-18 items-center px-4">

        <Navbar user={user} />

        <div className="ml-auto shrink-0">
          <Button user={user} />
        </div>

      </div>
    </header>
  );
}
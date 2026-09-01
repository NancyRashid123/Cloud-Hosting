"use client";

import Link from "next/link";
import ButtonLogout from "../buttonLogout/ButtonLogout";

interface User {
  username?: string;
  isAdmin?: boolean;
}

interface ButtonProps {
  user: User | null;
}

export default function Button({ user }: ButtonProps) {
  return (
    <div className="hidden items-center gap-3 md:flex">
      {user ? (
        <div className="flex items-center gap-3">
          <strong className="text-sm font-semibold capitalize text-blue-600 md:text-base">
            {user.username}
          </strong>

          <ButtonLogout />
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition duration-500 hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-blue-600 px-5 py-2 text-sm font-medium text-blue-600 transition duration-500 hover:bg-blue-600 hover:text-white"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}

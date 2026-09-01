
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrTechnology } from "react-icons/gr";

import MobileMenu from "../mobileMenu/MobileMenu";

interface User {
  username?: string;
  isAdmin?: boolean;
}

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const linkStyle =
    "relative font-medium text-gray-700 transition duration-300 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";

  const activeLinkStyle =
    "relative font-medium text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600";

  return (
    <div className="flex flex-1 items-center">

      {/* Logo */}
      <Link
        href="/"
        className="flex shrink-0 items-center text-lg font-bold text-blue-600 md:text-2xl"
      >
        Cloud
        <GrTechnology className="mx-1" />
        Hosting
      </Link>

      {/* Desktop Links */}
      <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">

        <li>
          <Link
            href="/"
            className={pathname === "/" ? activeLinkStyle : linkStyle}
          >
            Home
          </Link>
        </li>

        {user?.isAdmin && (
          <li>
            <Link
              href="/admin"
              className={
                pathname.startsWith("/admin")
                  ? activeLinkStyle
                  : linkStyle
              }
            >
              Admin
            </Link>
          </li>
        )}

        <li>
          <Link
            href="/about"
            className={
              pathname === "/about" ? activeLinkStyle : linkStyle
            }
          >
            About
          </Link>
        </li>

        <li>
          <Link
            href="/articles"
            className={
              pathname.startsWith("/articles")
                ? activeLinkStyle
                : linkStyle
            }
          >
            Articles
          </Link>
        </li>

      </ul>

      {/* Mobile */}
      <div className="ml-auto md:hidden">
        <MobileMenu user={user} />
      </div>

    </div>
  );
}
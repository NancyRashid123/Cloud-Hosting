"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdPeople,
  MdSettings,
} from "react-icons/md";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: MdDashboard,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: MdArticle,
  },
  {
    title: "Comments",
    href: "/admin/comments",
    icon: MdPeople,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: MdSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-20 bg-blue-500 p-3 text-white md:w-60 md:p-6">
      <h2 className="mb-10 text-3xl font-bold hidden md:block">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-6 md:gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition duration-500
                ${
                  pathname === link.href
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-600"
                }`}
            >
              <Icon size={22} />
              <span className="hidden md:block">{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
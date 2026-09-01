// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";

// export default function MobileMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="relative">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="text-3xl text-blue-600 transition hover:text-blue-700 md:hidden duration-500 cursor-pointer"
//       >
//         {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
//       </button>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute right-0 top-full z-50 w-72 rounded-xl bg-white shadow-xl md:hidden">
//           <ul className="flex flex-col p-6 gap-2">
//             <li>
//               <Link
//                 href="/"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-3 transition hover:bg-blue-50 hover:text-blue-600"
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/admin"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-3 transition hover:bg-blue-50 hover:text-blue-600"
//               >
//                 Admin Panel
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/about"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-3 transition hover:bg-blue-50 hover:text-blue-600"
//               >
//                 About
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/articles"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-3 transition hover:bg-blue-50 hover:text-blue-600"
//               >
//                 Articles
//               </Link>
//             </li>

//             <Link
//               href="/login"
//               onClick={() => setIsOpen(false)}
//               className="mt-3 rounded-lg bg-blue-600 py-3 text-center text-white transition duration-300 hover:bg-blue-700"
//             >
//               Login
//             </Link>

//             <Link
//               href="/register"
//               onClick={() => setIsOpen(false)}
//               className="rounded-lg border border-blue-600 py-3 text-center text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
//             >
//               Register
//             </Link>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import ButtonLogout from "../buttonLogout/ButtonLogout";

interface User {
  username?: string;
  isAdmin?: boolean;
}

interface MobileMenuProps {
  user: User | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">

      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-3xl text-blue-600 transition duration-300 hover:text-blue-700"
      >
        {isOpen ? <IoMdClose /> : <AiOutlineMenu />}
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">

          <ul className="flex flex-col gap-2">

            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            {/* Admin */}
            {user?.isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Admin
                </Link>
              </li>
            )}

            {/* About */}
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
              >
                About
              </Link>
            </li>

            {/* Articles */}
            <li>
              <Link
                href="/articles"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
              >
                Articles
              </Link>
            </li>

            {/* Divider */}
            <div className="my-2 h-px bg-gray-100" />

            {/* Auth */}
            {user ? (
              <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">

                <div>
                  <p className="text-xs text-gray-500">
                    Welcome
                  </p>

                  <p className="font-semibold capitalize text-blue-600">
                    {user.username}
                  </p>
                </div>

                <ButtonLogout />

              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-blue-600 py-3 text-center font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}

          </ul>
        </div>
      )}

    </div>
  );
}

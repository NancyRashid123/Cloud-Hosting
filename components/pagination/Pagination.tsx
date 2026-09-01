import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  pageNumber: number;
  pages: number;
  route : string
}
export default function Pagination({ pageNumber, pages, route }: PaginationProps) {
  const pageArray : number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageArray.push(i);
  }
  const currentPage = pageNumber;
  const arrowStyle : string = "flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition duration-500 hover:bg-blue-600 cursor-pointer";
  return (
    <div className="flex items-center gap-4 justify-center">
      {pageNumber !== 1 && (
        <Link href={`${route}?pageNumber=${currentPage - 1}`} className={arrowStyle}>
        <IoIosArrowBack />
      </Link>
      )}
      <div className="flex gap-2 items-center justify-center">
        {pageArray.map((page) => {
          return (
            <Link
              key={page}
              href={`${route}?pageNumber=${page}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 cursor-pointer
        ${
          currentPage === page
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white"
        }`}
            >
              {page}
            </Link>
          );
        })}
      </div>
      {pageNumber !== pages && (
         <Link href={`${route}?pageNumber=${currentPage + 1}`}  className={arrowStyle}>
        <IoIosArrowForward />
      </Link>
      )}
    </div>
  );
}

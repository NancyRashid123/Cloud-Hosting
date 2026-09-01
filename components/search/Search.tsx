"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Search() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchText);
    router.push(`/articles/searchPage?search=${searchText}`);
  }
  return (
    <form className="relative w-full max-w-2xl m-auto " onSubmit={handleSearch}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
      <input
        type="search"
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 bg-white pl-14 pr-5 py-4 text-lg shadow-sm outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </form>
  );
}

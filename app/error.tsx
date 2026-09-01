"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">😢</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-500 mt-3 break-words">
          {error.message}
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 rounded-xl  bg-linear-to-r from-sky-500 to-blue-600 py-3 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🔄 Try Again
          </button>

          <Link
            href="/"
            className="flex-1 rounded-xl border-2 border-blue-500 py-3 text-blue-600 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  );
}
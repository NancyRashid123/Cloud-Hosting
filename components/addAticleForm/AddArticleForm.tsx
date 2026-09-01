"use client";
import { domain } from "@/utiles/constantes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddArticleForm() {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const router = useRouter();
  const handleArticleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
     if (titleText.trim() === "") {
    return toast.error("Title is required, please fill it out.");
  }

  if (descriptionText.trim() === "") {
    return toast.error("Description is required, please fill it out.");
  }

    try{
      await axios.post(`${domain}/api/articles`, {title: titleText, description: descriptionText}
      );
      setTitleText("");
      setDescriptionText("");
      toast.success("Article added successfully");
      router.refresh();
    }
    catch(error){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        setTitleText("");
      setDescriptionText("");
      router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-6 shadow-xl md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Add New Article
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Create a new article and share it with your readers.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleArticleSubmit}>
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Article Title
          </label>

          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Enter article title"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
          value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            rows={6}
            placeholder="Write your article description..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4">

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-500 hover:bg-blue-700 hover:shadow-lg cursor-pointer"
          >
            Add Article
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { domain } from "@/utiles/constantes";

interface ArticleDeleteButtonProps {
  articleId: number;
}

export default function DeleteArticleButton({
  articleId,
}: ArticleDeleteButtonProps) {
  const router = useRouter();
  const handleDeleteArticle = async (articleId: number) => {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        await axios.delete(`${domain}/api/articles/${articleId}`);
        toast.success("Article deleted successfully");
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <button
      onClick={() => handleDeleteArticle(articleId)}
      type="button"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
      title="Delete Article"
    >
      <FiTrash2 />
    </button>
  );
}

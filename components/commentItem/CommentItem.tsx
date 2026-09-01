"use client";
import { CommentWithUser } from "@/utiles/type";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CommentModal from "../commentModal/CommentModal";
import { useState } from "react";
import axios from "axios";
import { domain } from "@/utiles/constantes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

export default function CommentItem({ comment, userId }: CommentItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handelDeleteComment = async () => {
    try {
      if (confirm("Are you sure you want to delete this comment?")) {
        await axios.delete(`${domain}/api/comments/${comment.id}`);
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
    <div className="group border-b border-gray-100 py-6 last:border-b-0">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
          {comment.user.username.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className=" flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-gray-800">
                {comment.user.username}
              </h4>

              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            {userId && userId === comment.userId && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                  title="Edit comment"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FiEdit2 />
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                  title="Delete comment"
                  onClick={handelDeleteComment}
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
          </div>

          {/* Comment */}
          <p className="mt-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm leading-7 text-gray-600">
            {comment.text}
          </p>

          {isModalOpen && (
            <CommentModal
              setIsModalOpen={setIsModalOpen}
              text={comment.text}
              commentId={comment.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}

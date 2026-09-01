"use client"
import { domain } from '@/utiles/constantes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiSend } from 'react-icons/fi'
interface Props {
    articleId: number
}

export default function AddComment({articleId}: Props) {
    const router = useRouter();
    const [text, setText] = useState("");
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(text === "") return toast.error("Please enter a comment");
        try{
          await  axios.post(`${domain}/api/comments`, {text , articleId});
            setText("");

  toast.success("Comment added successfully");

  router.refresh();
        }catch(error){
            if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
        }
  }
  return (
       <form className="mb-8 rounded-2xl bg-gray-50 p-4" onSubmit={handleSubmit}>
    
                <input
                  type="text"
                  value={text}
                  placeholder="Write your comment..."
                  onChange={(e) => setText(e.target.value)}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
    
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                  >
                    <FiSend />
                    Add Comment
                  </button>
                </div>
    
              </form>
  )
}

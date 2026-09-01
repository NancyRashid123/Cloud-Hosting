"use client"
import { domain } from '@/utiles/constantes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
interface CommentModalProps {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
   text: string,
   commentId: number
}
export default function CommentModal({setIsModalOpen , text , commentId}:CommentModalProps) {
    const [updateComment , setUpdateComment] = useState(text)
    const router = useRouter();
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(updateComment === "") return toast('write something' ,
  {
   
    style: {
      borderRadius: '10px',
      background: '#3A86FF',
      color: '#fff',
    },
  }
);;
        try{
           await axios.put(`${domain}/api/comments/${commentId}` , {text: updateComment});
           setUpdateComment("");
           setIsModalOpen(false);
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
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-black  flex items-center justify-center  '>
        <div className='rounded-2xl bg-gray-50 p-4 w-2/4'>
           <div className='flex justify-end mb-5'> <IoMdClose onClick={() => setIsModalOpen(false)} className='text-2xl cursor-pointer hover:text-red-500'/> </div>
            <form className=" flex flex-col gap-3 items-center " onSubmit={handleUpdate}>
                       
                       <input
                         type="text"
                         value={updateComment}
                         onChange={(e) => setUpdateComment(e.target.value)}
                         placeholder="Edit comment..."
                         className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                       />
           
                       
                         <button
                           type="submit"
                           className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                         >
                           
                           Edit Comment
                         </button>
                       
           
                     </form>
        </div>
        
       
    </div>
  )
}

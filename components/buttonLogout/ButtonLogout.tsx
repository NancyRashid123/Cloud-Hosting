"use client";
import { domain } from "@/utiles/constantes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import ButtonSpinner from "../buttonSpinner/ButtonSpinner";

export default function ButtonLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

       await axios.get(`${domain}/api/users/logout`);
      toast.success("Logged out successfully 🎉");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        <>
          <IoLogOutOutline className="text-lg" />
          
        </>
      )}
    </button>
  );
}

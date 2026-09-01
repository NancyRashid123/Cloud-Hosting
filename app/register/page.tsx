"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import { domain } from "@/utiles/constantes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonSpinner from "@/components/buttonSpinner/ButtonSpinner";

interface RegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const initialValues: RegisterValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const registerSchema = Yup.object({
    username: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const router = useRouter();
    const [loading, setLoading] = useState(false);

  const handleSubmit = async(values: RegisterValues) => {
     try {
      setLoading(true);
      await axios.post(`${domain}/api/users/register`, values);
      toast.success(`Registered successfully, welcome ${values.username}🎉`);
      router.replace("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Regester failed");
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-blue-100 px-4 py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="text-center text-4xl font-bold text-blue-700">
            Create Account
          </h1>

          <p className="mt-2 mb-8 text-center text-gray-500">
            Join Cloud Hosting today
          </p>

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">
              Full Name
            </label>

            <Field
              name="username"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <ErrorMessage
              name="username"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">
              Email
            </label>

            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <ErrorMessage
              name="email"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">
              Password
            </label>

            <Field
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <ErrorMessage
              name="password"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="mb-2 block font-semibold text-gray-700">
              Confirm Password
            </label>

            <Field
              name="confirmPassword"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300 cursor-pointer"
          >
            {loading ? <ButtonSpinner/> : "Creat Account"}
          </button>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}
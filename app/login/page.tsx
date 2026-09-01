"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonSpinner from "@/components/buttonSpinner/ButtonSpinner";
import { domain } from "@/utiles/constantes";


interface FormValues {
  email: string;
  password: string;
  username?: string;
}

export default function LoginPage() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await axios.post(`${domain}/api/users/login`, values);
      toast.success(`Logged in successfully, welcome back  🎉`);
      router.replace("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-blue-100 px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <h1 className="mb-2 text-center text-4xl font-bold text-blue-700">
            Welcome Back
          </h1>

          <p className="mb-8 text-center text-gray-500">
            Login to your account
          </p>

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

          <div className="mb-6">
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

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition duration-500 hover:scale-105 hover:shadow-blue-300  disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? <ButtonSpinner/> : "Login"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

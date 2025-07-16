"use client";

import { loginToApi, LoginToApiParams } from "@/lib/helper-api";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const scheme = z.object({
  email: z.email({ message: "Email tidak valid" }),
  password: z.string(),
});

const LoginClient = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (params: LoginToApiParams) => loginToApi(params),
    mutationKey: ["loginKey"],
    onError: (data) => {
      if (data.message === "Email atau password salah!") {
        setError("email", {
          message: data.message,
        });
        setError("password", {
          message: data.message,
        });
        return;
      }
      console.error(data);
      toast.error(data.message);
    },
    onSuccess: () => {
      toast.success("Sukses login!");
      router.push("/");
    },
  });
  const submit: SubmitHandler<z.infer<typeof scheme>> = ({
    email,
    password,
  }) => {
    mutation.mutate({
      email,
      password,
    });
  };
  return (
    <>
      <div className="absolute flex justify-center items-center mt-3 text-center w-full">
        <h1 className="text-4xl font-bold text-blue-600">Belanjain</h1>
      </div>

      <div className="flex px-4 min-h-screen items-center justify-center lg:pt-4 gap-10">
        <div className="md:flex hidden flex-col items-center text-center">
          <img src="/svg/login.svg" className="w-64" alt="" />
          <h2 className="mt-5 font-bold text-xl">
            Jual Beli Mudah Hanya di Belanjain
          </h2>
          <p className="text-sm text-slate-500 mt-2">Selamat datang kembali!</p>
        </div>

        <div className="bg-white shadow-xl rounded border p-5 border-slate-200 md:w-sm w-full h-fit">
          <h1 className="text-center font-semibold text-2xl">
            Daftar Sekarang
          </h1>
          <p className="text-sm text-center mt-1">
            Belum punya akun Belanjain?{" "}
            <Link href="/register" className="text-blue-600">
              Daftar
            </Link>
          </p>

          <form className="flex flex-col mt-10" onSubmit={handleSubmit(submit)}>
            <div className="w-full">
              <input
                type="email"
                className={`w-full py-2 px-3 outline-none border ${
                  errors.email ? "border-red-600" : "focus:border-blue-600"
                } rounded-lg`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="w-full mt-4">
              <div
                className={`w-full flex gap-2 items-center py-2 px-3 border ${
                  errors.password
                    ? "border-red-600"
                    : "focus-within:border-blue-600"
                } rounded-lg`}
              >
                <div className="w-5 cursor-pointer">
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </div>
                <input
                  type="password"
                  className="outline-none w-full"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-blue-600 py-2 px-4 w-full mt-5 text-white font-semibold rounded-lg shadow cursor-pointer transition duration-150 active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginClient;

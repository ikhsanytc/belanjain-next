"use client";
import { useModalMasuk } from "@/contexts/modal-masuk";
import { useUserInfo } from "@/contexts/user";
import { loginToApi, LoginToApiParams } from "@/lib/helper-api";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const scheme = z.object({
  email: z.email({ message: "Emai tidak valid" }),
  password: z.string(),
});

const ModalMasuk = () => {
  const { showModalMasuk, setShowModalMasuk } = useModalMasuk();
  const { refresh, user } = useUserInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
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
    onSuccess: async () => {
      await refresh();
      setShowModalMasuk(false);
      setValue("email", "");
      setValue("password", "");
      toast.success(`Sukses login, welcome back`);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const modalPutihRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalPutihRef.current &&
        !modalPutihRef.current.contains(e.target as Node)
      ) {
        setShowModalMasuk(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitLogin: SubmitHandler<z.infer<typeof scheme>> = ({
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
      {/* Modal Masuk */}
      <div
        className={`fixed h-full w-full z-[9999] bg-gray-800/10 backdrop-filter backdrop-blur-sm flex justify-center items-center px-4 transition duration-300 ${
          showModalMasuk ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white p-5 w-96 rounded-lg" ref={modalPutihRef}>
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => setShowModalMasuk(false)}
          >
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </div>

          <div className="flex justify-between mt-10 items-center">
            <h1 className="text-2xl font-semibold">Masuk</h1>
            <a href="/register" className="text-blue-600 hover:text-blue-500">
              Daftar
            </a>
          </div>

          <form
            className="flex flex-col gap-3 mt-7"
            onSubmit={handleSubmit(submitLogin)}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-600"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Masukkan email"
                className={`rounded-lg border  px-3 py-2  ${
                  errors.email
                    ? "border-red-500 outline-red-600"
                    : "border-slate-300 outline-blue-500"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  className={`w-full rounded-lg border px-3 py-2 ${
                    errors.password
                      ? "border-red-500 outline-red-600"
                      : "border-slate-300 outline-blue-500"
                  }`}
                  {...register("password")}
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} size="1x" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size="1x" />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 py-2 font-semibold text-white rounded-lg px-3 text-sm hover:bg-blue-500 cursor-pointer active:scale-105 transition duration-150"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalMasuk;

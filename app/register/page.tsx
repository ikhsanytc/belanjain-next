"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerToApi, RegisterToApiParams } from "@/lib/helper-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const scheme = z.object({
  email: z.email({ error: "Email tidak valid" }),
  username: z.string().min(4, "Minimal 4 karakter"),
  password: z.string().min(6, "Minimal 6 karakter"),
  confirmPassword: z.string(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (params: RegisterToApiParams) => registerToApi(params),
    mutationKey: ["registerKey"],
    onError: (data) => {
      console.error(data);
      toast.error(data.message);
    },
    onSuccess: () => {
      setValue("email", "");
      setValue("username", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      toast.success("Sukses daftar, silahkan login");
      router.push("/login");
    },
  });
  const submit: SubmitHandler<z.infer<typeof scheme>> = ({
    email,
    password,
    username,
    confirmPassword,
  }) => {
    if (password != confirmPassword) {
      setError("confirmPassword", {
        message: "Silahkan ulangi password!",
      });
      return;
    }
    mutation.mutate({
      email,
      password,
      username,
    });
  };
  return (
    <>
      <div className="absolute flex justify-center items-center mt-3 text-center w-full">
        <h1 className="text-4xl font-bold text-blue-600">Belanjain</h1>
      </div>

      <div className="flex px-4 min-h-screen items-center justify-center lg:pt-4 gap-10">
        <div className="md:flex hidden flex-col items-center text-center">
          <img src="/svg/welcome.svg" className="w-64" alt="" />
          <h2 className="mt-5 font-bold text-xl">
            Jual Beli Mudah Hanya di Belanjain
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Gabung untuk rasakan pengalaman yang nyata!
          </p>
        </div>

        <div className="bg-white shadow-xl rounded border p-5 border-slate-200 md:w-sm w-full h-fit">
          <h1 className="text-center font-semibold text-2xl">
            Daftar Sekarang
          </h1>
          <p className="text-sm text-center mt-1">
            Sudah punya akun Belanjain?{" "}
            <Link href="/login" className="text-blue-600">
              Masuk
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
            </div>

            <div className="w-full mt-4">
              <input
                type="text"
                className={`w-full py-2 px-3 outline-none border ${
                  errors.username ? "border-red-600" : "focus:border-blue-600"
                } rounded-lg`}
                placeholder="Username"
                {...register("username")}
              />
            </div>

            <div className="w-full mt-4">
              <div
                className={`w-full flex gap-2 items-center py-2 px-3 border ${
                  errors.password
                    ? "border-red-600"
                    : "focus-within:border-blue-600"
                } rounded-lg`}
              >
                <div
                  className="w-5 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} size="1x" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size="1x" />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="outline-none w-full"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </div>

            <div className="w-full mt-4">
              <div
                className={`w-full flex gap-2 items-center py-2 px-3 border ${
                  errors.confirmPassword
                    ? "border-red-600"
                    : "focus-within:border-blue-600"
                } rounded-lg`}
              >
                <div
                  className="w-5 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} size="1x" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size="1x" />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="outline-none w-full"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </div>
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

export default Register;

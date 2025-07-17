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
import { useEffect, useState } from "react";
import { validatePassword } from "@/lib/utils";
import zxcvbn from "zxcvbn";
import { AnimatePresence, motion } from "motion/react";

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
    watch,
    getValues,
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
  const [scorePassword, setScorePassword] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showModalTermsPrivacy, setShowModalTermsPrivacy] = useState(false);
  const router = useRouter();
  const password = watch("password");
  const mutation = useMutation({
    mutationFn: (params: RegisterToApiParams) => registerToApi(params),
    mutationKey: ["registerKey"],
    onError: (data) => {
      if (data.message === "Email sudah dipakai!") {
        setError("email", {
          message: data.message,
        });
        return;
      }
      if (data.message === "Username sudah dipakai!") {
        setError("username", {
          message: data.message,
        });
        return;
      }
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
  useEffect(() => {
    const { score } = zxcvbn(password);
    setScorePassword(score);
  }, [password]);
  const submit: SubmitHandler<z.infer<typeof scheme>> = ({
    password,
    confirmPassword,
  }) => {
    if (password != confirmPassword) {
      setError("confirmPassword", {
        message: "Silahkan ulangi password!",
      });
      return;
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword.valid) {
      setError("password", {
        message: isValidPassword.message,
      });
      return;
    }
    setShowModalTermsPrivacy(true);
  };
  const saveUser = () => {
    const { email, username, password } = getValues();
    mutation.mutate({
      email,
      username,
      password,
    });
    setShowModalTermsPrivacy(false);
  };
  const calculateScore = () => {
    switch (scorePassword) {
      case 0:
        return "w-1/10 bg-red-500 p-1 rounded-l-full";
      case 1:
        return "w-2/5 bg-red-500 p-1 rounded-l-full";
      case 2:
        return "w-3/5 bg-yellow-500 p-1 rounded-l-full";
      case 3:
        return "w-4/5 bg-green-500 p-1 rounded-l-full";
      case 4:
        return "w-full bg-green-500 p-1 rounded-full";
    }
  };
  return (
    <>
      <div
        className={`fixed z-[999] flex justify-center w-full h-full bg-black/50 backdrop-filter backdrop-blur-md ${
          showModalTermsPrivacy
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="bg-white mt-10 shadow-2xl border border-slate-200 rounded-xl h-fit md:w-1/2 w-full">
          <div className="p-4">
            <h1 className="text-xl font-bold">
              Syarat & Ketentuan dan Kebijakan Privasi
            </h1>
          </div>
          <hr className="border-slate-200" />
          <div className="p-4 mt-2">
            <p className="">
              Dengan mendaftar, Anda menyetujui Syarat & Ketentuan dan Kebijakan
              Privasi kami.
            </p>
          </div>
          <hr className="border-slate-200" />
          <div className="p-4 mt-2 flex gap-4 items-center">
            <button
              className="px-6 py-2 bg-blue-600 rounded-xl active:scale-95 text-white font-semibold cursor-pointer transition duration-150"
              onClick={saveUser}
            >
              Setuju
            </button>
            <button
              className="px-6 py-2 bg-slate-600 rounded-xl active:scale-95 text-white font-semibold cursor-pointer transition duration-150"
              onClick={() => setShowModalTermsPrivacy(false)}
            >
              Tidak setuju
            </button>
          </div>
        </div>
      </div>
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
              {errors.email && (
                <span className="text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
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
              {errors.username && (
                <span className="text-sm text-red-600">
                  {errors.username.message}
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
                  autoComplete="new-password"
                  onFocus={() => setShowScore(true)}
                  {...register("password")}
                  onBlur={() => setShowScore(false)}
                />
              </div>
              <AnimatePresence mode="wait">
                {showScore ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="w-full rounded-full border-1 mt-1 transition-all duration-300"
                  >
                    <motion.div
                      className={`${calculateScore()} transition-all duration-300`}
                    ></motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {errors.password && (
                <span className="text-sm text-red-600">
                  {errors.password.message}
                </span>
              )}
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
              {errors.confirmPassword && (
                <span className="text-sm text-red-600">
                  {errors.confirmPassword.message}
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

export default Register;

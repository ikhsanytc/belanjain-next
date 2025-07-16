"use client";
import { useModalMasuk } from "@/contexts/modal-masuk";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

const ModalMasuk = () => {
  const { showModalMasuk, setShowModalMasuk } = useModalMasuk();
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

          <form className="flex flex-col gap-3 mt-7">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-600"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Masukkan email"
                className="rounded-lg border border-slate-300 px-3 py-2 outline-blue-500"
              />
              <span className="text-sm text-red-500">Email tidak valid</span>
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-blue-500"
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
              <span className="text-sm text-red-500">Password salah</span>
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

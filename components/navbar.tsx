"use client";
import {
  faSearch,
  faShoppingCart,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import ModalMasuk from "./Navbar/modal-masuk";
import { useModalMasuk } from "@/contexts/modal-masuk";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useUserInfo } from "@/contexts/user";
import { logout } from "@/lib/helper-api";

const Navbar = () => {
  const { setShowModalMasuk } = useModalMasuk();
  const [showModalLogout, setShowModalLogout] = useState(false);
  const { user, refresh } = useUserInfo();
  const [showModalSearch, setShowModalSearch] = useState(false);
  const modalSearchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {})();
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalSearchRef.current &&
        !modalSearchRef.current.contains(e.target as Node)
      ) {
        setShowModalSearch(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onLogout = async () => {
    await logout();
    await refresh();
    setShowModalLogout(false);
  };
  return (
    <>
      <nav className="fixed top-0 border-b border-slate-200 w-full z-[999]">
        <div className="px-4 p-2 lg:flex hidden justify-between items-center bg-slate-100">
          <h1 className="font-semibold text-sm">
            Belanja disini dapet gratis ongkir + diskon!
          </h1>
          <div className="flex gap-5">
            <p className="text-slate-500 text-sm font-light hover:text-blue-600 cursor-pointer">
              Tentang Belanjain
            </p>
          </div>
        </div>
        <div className="lg:h-20 h-16 px-4 flex justify-between items-center bg-white">
          <h1 className="lg:text-3xl text-xl text-blue-600 font-bold">
            Belanjain
          </h1>

          {/* Mobile */}
          <div className="flex lg:hidden gap-4">
            <FontAwesomeIcon icon={faSearch} size="1x" />
            <FontAwesomeIcon icon={faShoppingCart} size="1x" />
          </div>

          {/* Desktop Search */}
          <div className="relative w-2/3 md:block hidden">
            <form className="w-full border-2 z-50 rounded-lg py-1 px-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} size="1x" className="w-5" />
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Search..."
                onFocus={() => setShowModalSearch(true)}
              />
            </form>

            <div
              className={`absolute mt-2 rounded-lg p-5 bg-white w-full shadow flex flex-col gap-2 z-40  transition-all ease-in-out duration-300 ${
                showModalSearch
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-10 opacity-0"
              }`}
              ref={modalSearchRef}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center cursor-pointer w-full">
                  <FontAwesomeIcon icon={faClock} size="1x" />
                  <p>Lenovo thinkpad x1 carbon</p>
                </div>
                <button className="cursor-pointer">
                  <FontAwesomeIcon icon={faX} size="1x" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="lg:flex hidden items-center gap-5">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="1x"
              className="cursor-pointer"
            />
            <div className="border-1 h-7 border-slate-200"></div>
            {!user ? (
              <>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowModalMasuk(true)}
                    className="bg-transparent py-2 font-semibold text-blue-600 rounded-lg px-3 text-sm border border-blue-600 hover:border-blue-500 hover:text-blue-500 cursor-pointer active:scale-105 transition duration-150"
                  >
                    Masuk
                  </button>
                  <Link
                    href="/register"
                    className="bg-blue-600 py-2 font-semibold text-white rounded-lg px-3 text-sm hover:bg-blue-500 cursor-pointer active:scale-105 transition duration-150"
                  >
                    Daftar
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowModalLogout(true)}
                  className="bg-transparent py-2 font-semibold text-red-600 rounded-lg px-3 text-sm border border-red-600 hover:border-red-500 hover:text-red-500 cursor-pointer active:scale-105 transition duration-150"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed z-[9999] flex justify-center w-full h-full bg-black/50 backdrop-filter backdrop-blur-md ${
          showModalLogout ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="bg-white mt-10 shadow-2xl border border-slate-200 rounded-xl h-fit md:w-1/2 w-full">
          <div className="p-4">
            <h1 className="text-xl font-bold">Logout</h1>
          </div>
          <hr className="border-slate-200" />
          <div className="p-4 mt-2">
            <p className="">Anda yakin ingin logout?</p>
          </div>
          <hr className="border-slate-200" />
          <div className="p-4 mt-2 flex gap-4 items-center">
            <button
              className="px-6 py-2 bg-red-600 rounded-xl active:scale-95 text-white font-semibold cursor-pointer transition duration-150"
              onClick={onLogout}
            >
              Ya
            </button>
            <button
              className="px-6 py-2 bg-slate-600 rounded-xl active:scale-95 text-white font-semibold cursor-pointer transition duration-150"
              onClick={() => setShowModalLogout(false)}
            >
              Ga
            </button>
          </div>
        </div>
      </div>

      <ModalMasuk />
    </>
  );
};

export default Navbar;

"use client";
import { useModalMasuk } from "@/contexts/modal-masuk";
import {
  faHouse,
  faMobileScreen,
  faNoteSticky,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  const { setShowModalMasuk } = useModalMasuk();
  return (
    <footer className="fixed bottom-0 w-full md:hidden">
      <div className="h-16 px-4 flex justify-center items-center gap-14 bg-white border-t border-slate-200">
        <button className="flex flex-col gap-1 justify-center text-blue-600 items-center text-center">
          <FontAwesomeIcon icon={faHouse} size="1x" />
          <p className="font-semibold">Home</p>
        </button>
        <button className="flex flex-col gap-1 justify-center text-slate-500 items-center text-center">
          <FontAwesomeIcon icon={faMobileScreen} size="1x" />
          <p className="font-light">Feed</p>
        </button>
        <button className="flex flex-col gap-1 justify-center text-slate-500 items-center text-center">
          <FontAwesomeIcon icon={faNoteSticky} size="1x" />
          <p className="font-light">Transaksi</p>
        </button>
        <button
          onClick={() => setShowModalMasuk(true)}
          className="flex flex-col gap-1 justify-center text-slate-500 items-center text-center"
        >
          <FontAwesomeIcon icon={faUser} size="1x" />
          <p className="font-light">Akun</p>
        </button>
      </div>
    </footer>
  );
};

export default Footer;

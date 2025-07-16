"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ModalMasukType = {
  showModalMasuk: boolean;
  setShowModalMasuk: Dispatch<SetStateAction<boolean>>;
};

const ModalMasukContext = createContext<ModalMasukType | undefined>(undefined);

export const ModalMasukProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showModalMasuk, setShowModalMasuk] = useState(false);
  return (
    <ModalMasukContext.Provider value={{ showModalMasuk, setShowModalMasuk }}>
      {children}
    </ModalMasukContext.Provider>
  );
};

export const useModalMasuk = () => {
  const context = useContext(ModalMasukContext);
  if (!context) {
    throw new Error("useModalMasuk must be used within a ModalMasukProvider");
  }
  return context;
};

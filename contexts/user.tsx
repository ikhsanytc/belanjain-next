"use client";

import { getUserInfo, logout } from "@/lib/helper-api";
import { checkTokenBlacklist, getToken } from "@/lib/utils-server";
import { User } from "@prisma/client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: User | null;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    const userInfo = await getUserInfo();
    if (userInfo) {
      const token = await getToken();
      const isTokenBlacklist = await checkTokenBlacklist(token ?? "");
      if (isTokenBlacklist) {
        await logout();
        toast.error("Sesi anda expired, silahkan login ulang!");
        return;
      }
    }
    setUser(userInfo);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refresh: getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserProvider");
  }
  return context;
};

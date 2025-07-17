import { User } from "@prisma/client";
import { toast } from "react-toastify";

export type RegisterToApiParams = {
  username: string;
  email: string;
  password: string;
};

export type ReturnApiType = {
  error: boolean;
  message: string;
  data?: any;
};

export type LoginToApiParams = {
  email: string;
  password: string;
};

export async function registerToApi({
  email,
  username,
  password,
}: RegisterToApiParams) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function loginToApi({ email, password }: LoginToApiParams) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getUserInfo() {
  try {
    const res = await fetch("/api/getUserInfo");
    const data = await res.json();
    if (data.error) {
      return null;
    }
    return data.data as User;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function logout() {
  const res = await fetch("/api/logout", {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.error) {
    toast.error(data.message);
  }
}

"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function getToken() {
  const cookie = await cookies();
  const token = cookie.get("token-21c12");
  return token?.value ?? null;
}

export async function checkTokenBlacklist(token: string) {
  try {
    const isToken = await prisma.blacklist_Key.findFirst({ where: { token } });
    if (isToken) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

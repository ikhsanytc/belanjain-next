import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  let email: string, password: string;
  try {
    const json = await req.json();
    if (!json.email || !json.password) {
      return Response.json(
        {
          error: true,
          message: "Invalid input",
        },
        {
          status: 400,
        }
      );
    }
    email = json.email;
    password = json.password;
  } catch (e) {
    return Response.json(
      {
        error: true,
        message: "Invalid input",
      },
      {
        status: 400,
      }
    );
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return Response.json(
      {
        error: true,
        message: "Email atau password salah!",
      },
      {
        status: 401,
      }
    );
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return Response.json(
      {
        error: true,
        message: "Email atau password salah!",
      },
      {
        status: 401,
      }
    );
  const token = generateToken(user.id);
  (await cookies()).set({
    name: "token-21c12",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return Response.json({
    error: false,
    message: "Success",
    token,
  });
}

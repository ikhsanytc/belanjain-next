import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let email: string, username: string, password: string;
  try {
    const json = await req.json();
    if (!json.email || !json.username || !json.password) {
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
    username = json.username;
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
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name: username,
        password: passwordHash,
      },
    });
    return Response.json({
      error: false,
      message: "Success, silahkan login.",
    });
  } catch (e: any) {
    console.error(e);
    return Response.json({
      error: true,
      message: e.message,
    });
  }
}

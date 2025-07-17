import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token-21c12");
    if (token) {
      await prisma.blacklist_Key.create({
        data: {
          token: token.value,
        },
      });
      cookie.set({
        name: "token-21c12",
        value: "",
        path: "/",
        maxAge: 0,
      });
      return Response.json({
        error: false,
        message: "Ok",
      });
    }
    return Response.json(
      {
        error: true,
        message: "Anda belum login!",
      },
      {
        status: 400,
      }
    );
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return Response.json(
        {
          error: true,
          message: e.message,
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        error: true,
        message: "Unexpected error",
      },
      {
        status: 500,
      }
    );
  }
}

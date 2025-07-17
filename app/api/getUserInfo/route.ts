import { decodeToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token-21c12");
    if (token) {
      const userInfo = decodeToken(token.value);
      if (userInfo) {
        const user = await prisma.user.findUnique({
          where: { id: userInfo.userId },
        });
        return Response.json({
          error: false,
          message: "OK",
          data: user,
        });
      }
    }
    return Response.json(
      {
        error: true,
        message: "Anda belum login!",
      },
      {
        status: 401,
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

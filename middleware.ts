import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { checkTokenBlacklist } from "./lib/utils-server";

const SECRET = new TextEncoder().encode(
  process.env.SECRET_KEY || "aku_jelek_dan_aku_bangga"
);

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const pathLoginRegister = ["/login", "/register"];
  const token = req.cookies.get("token-21c12");
  if (pathLoginRegister.includes(currentPath) && token) {
    try {
      const { payload } = await jwtVerify(token.value, SECRET);
      if (!payload) throw new Error("Token invalid");
      return NextResponse.redirect(new URL("/", req.url));
    } catch (e) {
      const res = NextResponse.next();
      res.cookies.set({
        name: "token-21c12",
        value: "",
        path: "/",
        maxAge: 0,
      });
      return res;
    }
  }
  if (token && !pathLoginRegister.includes(currentPath)) {
    try {
      const { payload } = await jwtVerify(token.value, SECRET);
      if (!payload) throw new Error("Token invalid");
    } catch (e: unknown) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set({
        name: "token-21c12",
        value: "",
        path: "/",
        maxAge: 0,
      });
      return res;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

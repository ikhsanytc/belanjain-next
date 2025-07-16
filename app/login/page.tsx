import LoginClient from "@/components/Login/pageClient";
import { cookies } from "next/headers";

export default async function Login() {
  return <LoginClient />;
}

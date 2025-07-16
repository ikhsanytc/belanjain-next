import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { decodeToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}

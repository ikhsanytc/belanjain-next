import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ModalMasukProvider } from "@/contexts/modal-masuk";
import ProviderReactQuery from "@/components/provider-react-query";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Belanjain",
  description:
    "Belanjain – Situs belanja online terpercaya untuk kebutuhan harian, elektronik, fashion, dan banyak lagi. Promo menarik setiap hari!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable} antialiased`}>
        <ProviderReactQuery>
          <ModalMasukProvider>{children}</ModalMasukProvider>
          <ToastContainer />
        </ProviderReactQuery>
      </body>
    </html>
  );
}

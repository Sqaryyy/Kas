import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

export const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dođi da se ne složimo — Platforma za dijalog mladih",
  description:
    "Dijaloška platforma za mlade 18–26 godina. Sretnite nekoga ko misli potpuno drugačije, popijte kafu i razgovarajte.",
  keywords: ["dijalog", "mladi", "Srbija", "Beograd", "razgovor", "platforma"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body
        className={`${syne.variable} ${jakarta.variable} ${poppins.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}

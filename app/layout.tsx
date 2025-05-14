import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PepperCardGame",
  description: "Fun card game to play with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4 flex gap-6 items-center">
          <h1 className="font-bold text-xl">🃏 Pepper Card Game</h1>
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">Game</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}

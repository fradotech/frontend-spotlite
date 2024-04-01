import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "./_infrastructure/api.service";
import { TApiResponse } from "./_infrastructure/api.contract";
import { TUser } from "./(user)/_infrastructure/types/user.entity";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotlite",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response: TApiResponse<TUser> = await API.get("/users/account");
  const user = response.data;

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between items-center p-6 shadow mx-auto max-w-screen-xl">
          <div className="text-2xl font-bold">Spotlite</div>
          <div className="flex items-center">
            <Image
              className="h-8 w-8 rounded-full mr-4 border border-gray-200"
              src="/vercel.svg"
              alt="Profile"
              width={32}
              height={32}
            />
            {/* Only work if "use client" */}
            <div className="text-lg">{user?.name || "User Name"}</div>
          </div>
        </header>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}

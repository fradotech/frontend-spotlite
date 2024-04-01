"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TUser } from "./(user)/_infrastructure/types/user.entity";
import { UserAuthAction } from "./(user)/_infrastructure/actions/user-auth.action";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = React.useState<TUser | null>(null);

  React.useEffect(() => {
    UserAuthAction.account(setUser);
  }, []);

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
            <div className="text-lg">{user?.name || "User Name"}</div>
          </div>
        </header>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}

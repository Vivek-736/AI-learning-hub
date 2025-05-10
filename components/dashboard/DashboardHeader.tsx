"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsDashboard(pathname.endsWith("/dashboard") || pathname.endsWith("/analytics"));
  }, []);

  return (
    <div className={`p-5 shadow-md flex ${isDashboard ? 'justify-end' : 'justify-between'} items-center bg-white`}>
      {!isDashboard && (
        <Link href="/">
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/logo.png" width={50} height={50} alt="logo" priority />
            <h2 className="font-bold text-2xl text-gray-800">LearNova</h2>
          </div>
        </Link>
      )}
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "w-10 h-10",
          },
        }}
      />
    </div>
  );
};

export default DashboardHeader;

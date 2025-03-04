"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    if (window.location.pathname.endsWith('/dashboard')) {
      setIsDashboard(true);
    } else {
      setIsDashboard(false);
    }
  }, []);

  return (
    <div className={`p-5 shadow-md flex ${isDashboard ? 'justify-end' : 'justify-between'} items-center`}>
      {!isDashboard && (
      <Link href={'/'}>
        <div className="flex gap-2 items-center cursor-pointer">
        <Image src={'/logo.png'} width={50} height={50} alt="logo" />
        <h2 className="font-bold text-2xl">LearNova</h2>
        </div>
      </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardHeader;

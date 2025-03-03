/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { LayoutDashboard, Plus, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "../ui/progress";
import Link from "next/link";
import Image from "next/image";
import { CourseCountContext } from "../context/CourseCountContext";

const Sidebar = () => {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    }
  ];

  // @ts-expect-error
  const { totalCourse } = useContext(CourseCountContext);

  const progressValue = (totalCourse/10)*100

  const path = usePathname();
  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <Image src={'/logo.png'} width={80} height={80} alt="logo" />
        <h2 className="font-bold text-2xl">LearNova</h2>
      </div>
      <div className="mt-8">
        {totalCourse < 10 ? (
          <Link href={`/create`} className="w-full">
            <Button className="space-x-1 w-full">
              <Plus />
              <span>Create New</span>
            </Button>
          </Link>
        ) : (
          <Button disabled className="space-x-1 w-full">
            <Plus />
            <span>Create New</span>
          </Button>
        )}
        <div className="mt-6">
            {MenuList.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <div className={`flex gap-2 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path === menu.path && 'bg-slate-200'}`}>
                    <menu.icon />
                    <h2>{menu.name}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="border p-5 bg-indigo-100 rounded-lg absolute bottom-10 w-[85%]">
        <h2 className="text-lg mb-2 text-indigo-600">Available Credits: {10 - totalCourse}</h2>
        <Progress value={progressValue} />
        <h2 className="text-sm text-indigo-600">{totalCourse} Out of 10 Credits Used</h2>
        <Link href={"/dashboard/upgrade"} className="text-green-600 text-xs mt-3">
            Upgrade to create more
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

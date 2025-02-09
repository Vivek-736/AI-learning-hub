"use client";
import React from "react";
import { Button } from "../ui/button";
import { LayoutDashboard, Plus, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "../ui/progress";
import Link from "next/link";

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
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const path = usePathname();
  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <span>Logo</span>
        <h2 className="font-bold text-2xl">LearNova</h2>
      </div>
      <div className="mt-10">
        <Button className="w-full space-x-1">
          <Plus />
          <span>Create New</span>
        </Button>
        <div>
            {MenuList.map((menu, index) => (
                <div key={index} className={`flex gap-2 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path === menu.path && 'bg-slate-200'}`}>
                    <menu.icon />
                    <h2>{menu.name}</h2>
                </div>
            ))}
        </div>
      </div>

      <div className="border p-5 bg-sky-100 rounded-lg absolute bottom-10 w-[85%]">
        <h2 className="text-lg mb-2">Available Credits: 10</h2>
        <Progress value={30} />
        <h2 className="text-sm">1 Out of 10 Credits Used</h2>
        <Link href={"/dashboard/upgrade"} className="text-purple-600 text-xs mt-3">
            Upgrade to create more
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

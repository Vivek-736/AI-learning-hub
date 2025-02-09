"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <>
      <div className="flex bg-gradient-to-tr from-green-200 via-blue-200 h-screen to-indigo-200 items-center justify-center flex-col gap-y-4">
        <h1 className="text-4xl">Hello and welcome to learning hub</h1>
        <Button variant={"destructive"} className="text-xs p-4" onClick={() => redirect("/sign-in")}>
          Log In
        </Button>
        <UserButton />
      </div>
    </>
  );
}
"use client";
// import { Button } from "@/components/ui/button";
// import { UserButton } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Intro from "@/components/home/Intro";
import Footer from  "@/components/home/Footer";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <>
      {/* <div className="flex bg-gradient-to-tr from-green-200 via-blue-200 h-screen to-indigo-200 items-center justify-center flex-col gap-y-4">
        <h1 className="text-4xl">Hello and welcome to learning hub</h1>
        <Button
          variant={"destructive"}
          className="text-xs p-4"
          onClick={() => redirect("/sign-in")}
        >
          Log In
        </Button>
        <UserButton />
      </div> */}
      <Navbar />
      <Intro/>
      <Footer />

    </>
  );
}
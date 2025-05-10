"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (userEmail === "vivekvrc777@gmail.com") {
        router.push("/analytics");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, user, router]);

  return <SignIn />;
}
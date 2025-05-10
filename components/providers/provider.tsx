"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

function Provider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;

      if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-out")) {
        return;
      }

      CheckIsNewUser().then(() => {
        if (userEmail && (userEmail === "vivekvrc777@gmail.com" || userEmail === "gandlahimaja14@gmail.com")) {
          router.push("/analytics");
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user, router, pathname]);

  const CheckIsNewUser = async () => {
    try {
      const res = await axios.post("/api/create-user", { user });
      console.log(res.data);
    } catch (error) {
      console.error("Error checking or creating user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;

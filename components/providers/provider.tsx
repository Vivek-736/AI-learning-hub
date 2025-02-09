"use client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

function provider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && CheckIsNewUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const CheckIsNewUser = async () => {
    const result = await db
      .select()
      .from(USER_TABLE)
      .where(
        eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || "")
      );
    // console.log(result);

    if (result.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userRes = await db
        .insert(USER_TABLE)
        .values({
          userName: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        })
        .returning({ id: USER_TABLE.id });
    //   console.log(userRes);
    }
  };

  return <div>{children}</div>;
}

export default provider;

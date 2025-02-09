import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-md flex justify-end">
      <UserButton />
    </div>
  );
};

export default DashboardHeader;

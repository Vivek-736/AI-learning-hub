import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="md:block hidden md:w-64 fixed">
                <Sidebar />
            </div>
            <div className="md:ml-64">
                <DashboardHeader />
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

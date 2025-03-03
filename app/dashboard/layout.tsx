"use client";
import { CourseCountContext } from "@/components/context/CourseCountContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [totalCourse, setTotalCourse] = useState(0);

    return (
        <CourseCountContext.Provider value={{totalCourse, setTotalCourse}}>
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
        </CourseCountContext.Provider>
    );
};

export default DashboardLayout;

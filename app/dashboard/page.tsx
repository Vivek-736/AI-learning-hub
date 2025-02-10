import CourseCard from "@/components/dashboard/CourseCard";
import Welcome from "@/components/dashboard/Welcome";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Welcome />
      <CourseCard />
    </div>
  );
};

export default page;

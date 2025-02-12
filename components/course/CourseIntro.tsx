/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";
import { Progress } from "../ui/progress";

interface CourseIntroProps {
  course: any;
}

const CourseIntro = ({ course }: CourseIntroProps) => {
  return (
    <div className="flex gap-5 items-center p-10 border rounded-lg shadow-xl">
      <Image src={"/course.png"} width={70} height={70} alt="Course Image" />
      <div>
        <h2 className="font-bold text-2xl">
          {course?.courseLayout.course_title}
        </h2>
        <p className="line-clamp-2">{course?.courseLayout?.course_summary}</p>
        <Progress className="mt-3" />
        <h2 className="mt-3 text-lg text-blue-600">Total Chapters: {course?.courseLayout?.chapters?.length}</h2>
      </div>
    </div>
  );
};

export default CourseIntro;

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";

interface CourseItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
}

const CourseItem = ({ course }: CourseItemProps) => {
  return (
    <div className="border-2 border-sky-300 rounded-lg shadow-xl p-5">
      <div className="flex justify-between items-center">
        <Image src={"/course.png"} alt="a laptop pic" width={50} height={50} />
        <h2 className="text-xs md:block hidden p-1 px-2 rounded-full bg-emerald-500 text-white">
          New
        </h2>
      </div>
      <h2 className="mt-3 font-medium md:text-xl text-xs">
        {course?.courseLayout?.course_title}
      </h2>
      <p className="text-xs line-clamp-2 text-gray-500 mt-2">
        {course?.courseLayout?.course_summary}
      </p>
      <div className="flex justify-end mt-6">
        {course?.status === "Generating" ? (
          <h2 className="text-sm p-1 px-2 rounded-full bg-gray-500 text-white flex gap-2 items-center">
            <RefreshCcw className="animate-spin h-5 w-5" />
            Generating...
          </h2>
        ) : (
          <Link href={`/course/${course?.courseId}`}>
            <Button>View</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseItem;

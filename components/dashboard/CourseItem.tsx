import React from "react";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";

interface CourseItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
}

const CourseItem = ({ course }: CourseItemProps) => {
  return (
    <div className="border rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center">
        <Image src={"/course.png"} alt="a laptop pic" width={50} height={50} />
        <h2 className="text-[10px] p-1 px-2 rounded-full bg-indigo-500 text-white">
          12 Dec 2025
        </h2>
      </div>
      <h2 className="mt-3 font-medium text-xl">
        {course?.courseLayout?.course_title}
      </h2>
      <p className="text-xs line-clamp-2 text-gray-500 mt-2">
        {course?.courseLayout?.course_summary}
      </p>
      <div className="mt-3">
        <Progress value={0} />
      </div>
      <div className="flex justify-end mt-3">
        {course?.status === "Generating" ? (
          <h2 className="text-sm p-1 px-2 rounded-full bg-gray-500 text-white flex gap-2 items-center">
            <RefreshCcw className="animate-spin h-5 w-5" />
            Generating...
          </h2>
        ) : (
          <Link href={`/course/${course?.id}`}>
            <Button>View</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseItem;

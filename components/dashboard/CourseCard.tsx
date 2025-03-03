/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { Button } from "../ui/button";
import { Plus, RefreshCcwDotIcon } from "lucide-react";
import { CourseCountContext } from "../context/CourseCountContext";
import Link from "next/link";

const CourseCard = () => {
  const { user } = useUser();
  const [courseCard, setCourseCard] = useState([]);
  const [loading, setLoading] = useState(false);
  // @ts-expect-error
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && GetCourseCard();
  }, [user]);

  const GetCourseCard = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    // console.log(result);
    setCourseCard(result.data.result);
    setLoading(false);
    setTotalCourse(result.data.result?.length)
  };

  return (
    <>
      <div className="md:hidden block space-y-2 mt-4">
      {totalCourse < 10 ? (
          <Link href={`/create`} className="w-full">
            <Button className="space-x-1 w-full">
              <Plus />
              <span>Create New Course</span>
            </Button>
          </Link>
        ) : (
          <Button disabled className="space-x-1 w-full">
            <Plus />
            <span>Create New Course</span>
          </Button>
        )}
        <span className="bg-sky-200 text-sky-600 flex justify-center p-2">You can only create 10 courses</span>
      </div>
      <div className="md:mt-10 mt-2">
        <h2 className="text-2xl font-bold text-slate-800 flex justify-between mb-4">
          Your Courses
          <Button onClick={() => GetCourseCard()} variant={"refresh"}>
            <RefreshCcwDotIcon />
            <span>Refresh</span>
          </Button>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
          {loading === false ? courseCard?.map((course, index) => (
            <CourseItem course={course} key={index} />
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          )) : [1, 2, 3, 4, 5, 6].map((index, item) => (
            <div key={index} className="h-56 w-full bg-slate-200 rounded-lg animate-pulse">
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseCard;

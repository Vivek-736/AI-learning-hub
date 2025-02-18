"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { Button } from "../ui/button";
import { RefreshCcwDotIcon } from "lucide-react";

const CourseCard = () => {
  const { user } = useUser();
  const [courseCard, setCourseCard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && GetCourseCard();
  }, [user]);

  const GetCourseCard = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result);
    setCourseCard(result.data.result);
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-slate-800 flex justify-between">
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
  );
};

export default CourseCard;

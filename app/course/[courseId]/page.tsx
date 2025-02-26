"use client";
import ChapterList from '@/components/course/ChapterList';
import CourseIntro from '@/components/course/CourseIntro';
import LearningResourceSec from '@/components/course/LearningResourceSec';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { courseId } = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [course, setCourse] = useState();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=> {
      GetCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const GetCourse = async () => {
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      console.log(result);
      setCourse(result.data.result);
    }

    return (
      <div>
        <DashboardHeader />
        <div className='mx-10 md:mx-36 lg:px-44 mt-10'>
          <CourseIntro course={course} />
          <LearningResourceSec courseId={courseId} />
          <ChapterList course={course} />
        </div>
      </div>
    )
}

export default page

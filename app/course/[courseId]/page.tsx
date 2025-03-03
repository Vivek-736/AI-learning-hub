"use client";
import ChapterList from '@/components/course/ChapterList';
import CourseIntro from '@/components/course/CourseIntro';
import LearningResourceSec from '@/components/course/LearningResourceSec';
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
      // console.log(result);
      setCourse(result.data.result);
    }

    return (
      <div>
        <div>
          <CourseIntro course={course} />
          <LearningResourceSec course={course} courseId={courseId} />
          <ChapterList course={course} />
        </div>
      </div>
    )
}

export default page

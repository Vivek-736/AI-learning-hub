/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import LearningCardItem from "./LearningCardItem";
import axios from "axios";
import Link from "next/link";

interface LearningResourceSecProps {
  courseId: any;
  course: any;
}

const LearningResourceSec = ({ courseId, course }: LearningResourceSecProps) => {
  const [studyTypeContent, setStudyTypeContent] = useState<Record<string, any>>({});

  const LearningList = [
    {
      name: "Notes",
      desc: "Pliant and organized notes for quick prep",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Quick and interactive flashcards",
      icon: "/flashcards.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      desc: "Engaging quizzes to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    }
  ];

  useEffect(() => {
    GetLearningList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const GetLearningList = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result.data);
    } catch (error) {
      console.error("Failed to fetch learning resources:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Learning Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
        {LearningList.map((item, index) => (
          <Link key={index} href={`/course/${courseId}${item.path}`} passHref>
            <LearningCardItem
              item={item}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={GetLearningList}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearningResourceSec;

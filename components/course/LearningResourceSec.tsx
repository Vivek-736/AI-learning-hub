"use client";
import React, { useEffect, useState } from "react";
import LearningCardItem from "./LearningCardItem";
import axios from "axios";
import Link from "next/link";

interface LearningResourceSecProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseId: any;
}

const LearningResourceSec = ({ courseId }: LearningResourceSecProps) => {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const LearningList = [
    {
      name: "Notes",
      desc: "Pliant and organized notes for quick prep",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcards",
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
    },
    {
      name: "QnA",
      desc: "Get instant answers to your questions",
      icon: "/QnA.png",
      path: "/qa",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetLearningList();
  });

  const GetLearningList = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });

    console.log(result?.data);
    setStudyTypeContent(result.data);
  };

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Learning Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
        {LearningList.map((item, index) => (
          <Link key={index} href={`/course/${courseId}${item.path}`}>
            <LearningCardItem
              key={index}
              item={item}
              studyTypeContent={studyTypeContent}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearningResourceSec;

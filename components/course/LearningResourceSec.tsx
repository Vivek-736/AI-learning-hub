"use client";
import React from "react";
import LearningCardItem from "./LearningCardItem";

const LearningResourceSec = () => {
    const LearningList = [
        {
            name: "Notes",
            desc: "Pliant and organized notes for quick prep",
            icon: "/notes.png",
            path: "/notes",
        },
        {
            name: "Flashcards",
            desc: "Quick and interactive flashcards",
            icon: "/flashcards.png",
            path: "/flashcards",
        },
        {
            name: "Quiz",
            desc: "Engaging quizzes to test your knowledge",
            icon: "/quiz.png",
            path: "/quiz",
        },
        {
            name: "QnA",
            desc: "Get instant answers to your questions",
            icon: "/QnA.png",
            path: "/qa",
        },
    ];

    return (
        <div className="mt-5">
            <h2 className="font-medium text-xl">Learning Resources</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
                {LearningList.map((item, index) => (
                    <LearningCardItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
};

export default LearningResourceSec;

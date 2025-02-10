import React, { useState } from "react";
import Image from "next/image";

interface SelectCardsProps {
  SelectedStudyType: (item: string) => void;
}

const SelectCards = ({ SelectedStudyType }: SelectCardsProps) => {
  const selections = [
    {
      name: "Exam Prep",
      icon: "/exam.png",
    },
    {
      name: "Job Prep",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding",
      icon: "/coding.png",
    },
    {
      name: "Other",
      icon: "/other.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  return (
    <div className=" p-10  border-[5px] border-violet-500 rounded-lg">
      <h2 className="text-center mb-2 text-xl">
        Select the category of your Learning Plan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-4">
        {selections.map((selection, index) => (
          <div
            onClick={() => {
              setSelectedOption(selection.name);
              SelectedStudyType(selection.name);
            }}
            key={index}
            className={`p-6 flex flex-col items-center justify-center border rounded-xl cursor-pointer transition-all duration-300 transform ${
              selectedOption === selection.name
                ? "border-gray-300 bg-gray-100 scale-105 shadow-lg"
                : "border-gray-900 hover:border-gray-300 hover:scale-110 hover:shadow-2xl"
            }`}
          >
            <Image
              src={selection.icon}
              alt={selection.name}
              width={70}
              height={70}
            />
            <h2 className="text-sm mt-2">{selection.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCards;

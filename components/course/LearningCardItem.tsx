/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface LearningCardItemProps {
  item: any;
  studyTypeContent: any;
  course: any;
  refreshData: () => void;
}

const LearningCardItem = ({
  item,
  studyTypeContent,
  course,
  refreshData
}: LearningCardItemProps) => {
  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    toast("Generating content...");
    setLoading(true);

    let chapters = '';
    course?.courseLayout.chapters.forEach((chapter: any) => {
      chapters = (chapter.chapter_title || chapter.chapterTitle) + ', ' + chapters;
    });

    try {
      await axios.post("/api/generate-study-type", {
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters
      });
      toast.success("Content generation started!");
      setTimeout(refreshData, 3000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const isContentAvailable = studyTypeContent?.[item.type]?.length > 0;

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center h-full ${!isContentAvailable && "grayscale"}`}>
      {!isContentAvailable ? (
        <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
          Unavailable
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Available
        </h2>
      )}
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 mb-4 text-center text-sm flex-grow">
        {item.desc}
      </p>
      <div className="mt-auto w-full">
        {!isContentAvailable ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              GenerateContent();
            }}
            variant={"outline"}
            className="w-full"
            disabled={loading}
          >
            {loading && <RefreshCcw className="animate-spin mr-2 h-4 w-4" />}
            Generate
          </Button>
        ) : (
          <Button variant={"outline"} className="w-full">
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearningCardItem;

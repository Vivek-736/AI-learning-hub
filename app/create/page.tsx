"use client";
import SelectCards from "@/components/inputField/SelectCards";
import TopicInput from "@/components/inputField/TopicInput";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  interface FormData {
    studyType?: string;
    topic?: string;
    difficultyLevel?: string;
  }

  useEffect(() => {
    console.log("Updated form data:", formData);
  }, [formData]);

  const handleUserInput = (fieldName: keyof FormData, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-3xl text-sky-500">
        Start Creating your Learning Plan
      </h2>
      <p className="text-gray-500 text-lg">
        Fill all details and create your machination to start learning
      </p>
      <div className="mt-10">
        {step === 0 ? (
          <SelectCards
            SelectedStudyType={(value) => handleUserInput("studyType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            selectDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>
      <div className="flex justify-between w-full mt-32">
        {step !== 0 ? (
          <Button onClick={() => setStep(step - 1)} variant={"outline"}>
            Previous
          </Button>
        ) : (
          <div />
        )}
        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button>Generate</Button>
        )}
      </div>
    </div>
  );
};

export default Create;

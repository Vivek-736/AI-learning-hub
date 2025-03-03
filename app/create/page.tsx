"use client";
import SelectCards from "@/components/inputField/SelectCards";
import TopicInput from "@/components/inputField/TopicInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  interface FormData {
    courseType?: string;
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

  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      // console.log(result);
      toast("Your course content is being generated, please wait for a moment or try clicking the refresh button");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error generating course outline:", error);
      toast("An error occurred while generating the course outline.");
    } finally {
      setLoading(false);
    }
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
            SelectedStudyType={(value) => handleUserInput("courseType", value)}
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
          <Button onClick={GenerateCourseOutline} disabled={loading}>{loading ? <Loader className="animate-spin" /> : "Generate"}</Button>
        )}
      </div>
    </div>
  );
};

export default Create;

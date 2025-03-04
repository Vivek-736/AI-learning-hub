/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface StepProgressProps {
  stepCount: any;
  setStepCount: any;
  data: any;
}

const StepProgress = ({ stepCount, setStepCount, data }: StepProgressProps) => {
  return (
    <>
      <div className="flex gap-5 items-center">
        {stepCount != 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
          >
            Previous
          </Button>
        )}
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? "bg-blue-400" : "bg-gray-400"
            }`}
          ></div>
        ))}
        {stepCount <= data.length -2 && <Button onClick={() => setStepCount(stepCount + 1)} variant="ghost" size="sm">
          Next
        </Button>}
      </div>
    </>
  );
};

export default StepProgress;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Notes = () => {
    const { courseId } = useParams();
    const [notes, setNotes] = useState<any[]>([]);
    const [stepCount, setStepCount] = useState<number>(0);

    useEffect(() => {
        GetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const GetNotes = async () => {
        try {
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "notes"
            });
            console.log(result?.data);
            setNotes(result?.data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    }

    const handleNext = () => {
        if (stepCount < notes.length - 1) {
            setStepCount(stepCount + 1);
        }
    };

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount(stepCount - 1);
        }
    };

    return (
        <div>
            <div className='flex gap-5 items-center'>
                {stepCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={handlePrevious}>Previous</Button>
                )}
                {notes?.map((item: any, index: number) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index <= stepCount ? "bg-blue-400" : "bg-gray-400"}`}>
                    </div>
                ))}
                {stepCount < notes.length - 1 && (
                    <Button onClick={handleNext} variant="ghost" size="sm">Next</Button>
                )}
            </div>
            <div className='my-10'>
                {notes.length > 0 && (
                    <div dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes.replace('```html', '') }} />
                )}
            </div>
        </div>
    )
}

export default Notes;

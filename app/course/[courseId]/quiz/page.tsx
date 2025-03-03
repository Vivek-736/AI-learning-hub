"use client";
import QuizCardItem from '@/components/course/QuizCardItem';
import StepProgress from '@/components/course/StepProgress';
import axios from 'axios'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Quiz = () => {
    const {courseId} = useParams();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
    
    useEffect(() => {
        GetQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    useEffect(() => {
        setCorrectAnswer(null);
    }, [stepCount]);

    const GetQuiz = async () => {
        const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "quiz"
        });
        // console.log(result?.data);
        setQuiz(result.data.content.questions)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkAnswer = (userAnswer: any, currentQuestion: any) => {
        if(userAnswer === currentQuestion?.correctAnswer) {
            setCorrectAnswer(true);
            return;
        }
        setCorrectAnswer(false);
    }
    
    return (
        <div>
            <h2 className='font-bold text-3xl text-center mb-2'>Quiz</h2>
            <StepProgress data={quiz} stepCount={stepCount} setStepCount={(value: React.SetStateAction<number>)=>setStepCount(value)} />

            <div>
                <QuizCardItem quiz={quiz[stepCount]} userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])} />
            </div>

            <div className="mt-4">
                {correctAnswer === false && (
                    <div className="bg-rose-300 text-rose-700 p-4 shadow-md border-2 border-rose-700 rounded-lg mt-10">
                        <h2 className="text-center text-xl font-semibold">Incorrect</h2>
                        <p className='text-center font-medium'>Your answer is incorrect ☹️, try again</p>
                    </div>
                )}
                {correctAnswer === true && (
                    <div className="bg-emerald-300 text-emerald-700 p-4 shadow-md border-2 border-emerald-700 rounded-lg mt-10">
                        <h2 className="text-center text-xl font-semibold">Correct</h2>
                        <p className='text-center font-medium'>You got it right, great job 😊, click next to ace the next one 💪</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Quiz;

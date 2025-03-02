/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';

interface QuizCardItemProps {
    quiz: any;
    userSelectedOption: (option: any) => void;
}

const QuizCardItem = ({ quiz, userSelectedOption }: QuizCardItemProps) => {
    const [selectedOption, setSelectedOption] = useState<string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined>(null);

    return (
        <div>
            <h2 className='font-medium text-center text-2xl my-2 p-5'>{quiz?.questionText}</h2>
            <div className='grid grid-cols-2 gap-5'>
                {quiz?.options.map((option: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                    <Button key={index} onClick={() => {setSelectedOption(option); userSelectedOption(option)}} variant={"refresh"} className={`w-full text-xs text-slate-800 text-center overflow-hidden ${selectedOption == option && "bg-blue-500 text-white hover:bg-blue-300 hover:text-gray-900"}`}>
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default QuizCardItem

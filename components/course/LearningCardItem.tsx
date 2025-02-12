/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';

interface LearningCardItemProps {
    item: any;
}

const LearningCardItem = ({item}: LearningCardItemProps) => {
    return (
        <div className='border shadow-md rounded-lg p-5 flex flex-col items-center h-full'>
            <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h2 className='font-medium mt-3'>{item.name}</h2>
            <p className='text-gray-500 mb-4 text-center text-sm flex-grow'>{item.desc}</p>
            <div className='mt-auto w-full'>
                <Button variant={"outline"} className='w-full'>
                    View
                </Button>
            </div>
        </div>
    )
}

export default LearningCardItem

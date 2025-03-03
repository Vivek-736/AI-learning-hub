"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface ChapterListProps {
    course: any;
}

const ChapterList = ({course}: ChapterListProps) => {
    const CHAPTERS = course?.courseLayout?.chapters

    return (
        <div className='mt-5 mb-8'>
            <h2 className='font-medium text-xl'>
                Chapters
            </h2>
            <div className='mt-3'>
                {CHAPTERS?.map((chapter: { chapter_number: any; chapter_title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; summary: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: any) => (
                    <div className='flex gap-5 items-center p-4 border shadow-md mb-2 rounded-lg cursor-pointer' key={chapter?.chapter_number || index}>
                        <h2 className='text'>📖</h2>
                        <div>
                            <h2 className='font-medium'>
                                {chapter?.chapter_title}
                            </h2>
                            <p className='text-gray-500 text-sm'>
                                {chapter?.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList

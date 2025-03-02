/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react'
import ReactCardFlip from 'react-card-flip';

interface FlashcardItemProps {
    isFlipped: any;
    handleClick: () => void;
    flashcard: any;
}

const FlashcardItem = ({isFlipped, handleClick, flashcard}: FlashcardItemProps) => {
    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div className='p-4 bg-red-400 text-white flex items-center justify-center rounded-lg cursor-pointer shadow-lg h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
                    <h2>{flashcard?.front}</h2>
                </div>

                <div className='p-4 bg-yellow-400 text-black flex items-center justify-center rounded-lg cursor-pointer shadow-lg h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
                    <h2>{flashcard?.back}</h2>
                </div>
            </ReactCardFlip>
        </div>
    )
}

export default FlashcardItem

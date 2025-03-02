"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import FlashcardItem from '@/components/course/FlashcardItem';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Flashcards = () => {
    const { courseId } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [flashcards, setFlashcards] = useState<{ content: any[] } | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState<CarouselApi | undefined>(undefined);

    useEffect(()=> {
        GetFlashCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }
        api.on('select', () => {
            setIsFlipped(false);
        })
    }, [api]);

    const GetFlashCards = async () => {
        const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "flashcard"
        });
        setFlashcards(result?.data);
        console.log(result?.data);
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }
    
    return (
        <div>
            <h2 className='font-bold text-3xl text-center'>
                Flashcards
            </h2>
            <p className='text-center text-gray-700 text-lg'>Flashcards help reinforce learning through active recall and spaced repetition</p>
            <div className='mt-10'>
                <Carousel setApi={(api) => setApi(api)}>
                    <CarouselContent>
                        {flashcards?.content?.map((flashcard, index) => (
                            <CarouselItem key={index} className='flex justify-center items-center'>
                                <FlashcardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>
    )
}

export default Flashcards

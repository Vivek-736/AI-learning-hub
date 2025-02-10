import React, { useState } from 'react'
import Image from 'next/image'

interface SelectCardsProps {
    SelectedStudyType: (item: string) => void;
}

const SelectCards = ({ SelectedStudyType }: SelectCardsProps) => {
    const selections = [
        {
            name: "Exam Prep",
            icon: "/exam.png"
        },
        {
            name: "Job Prep",
            icon: "/job.png"
        },
        {
            name: "Practice",
            icon: "/practice.png"
        },
        {
            name: "Coding",
            icon: "/coding.png"
        },
        {
            name: "Other",
            icon: "/other.png"
        }
    ]

    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

    const handleSelection = (name: string) => {
        setSelectedOption(name);
        SelectedStudyType(name);
    }

    return (
        <div>
            <h2 className='text-center mb-2 text-lg'>
                Select the category of your Learning Plan
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4'>
                {selections.map((selection, index) => (
                    <div 
                        onClick={() => handleSelection(selection.name)}
                        key={index}
                        className={`p-4 flex flex-col items-center justify-center border rounded-xl cursor-pointer transition-colors ${
                            selectedOption === selection.name 
                            ? "border-gray-300 bg-gray-100" 
                            : "border-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <Image 
                            src={selection.icon} 
                            alt={selection.name} 
                            width={50} 
                            height={50} 
                            className="h-12 w-12 object-contain"
                        />
                        <h2 className='text-sm mt-2'>{selection.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectCards

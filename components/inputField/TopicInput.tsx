import React from 'react'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'

interface TopicInputProps {
  setTopic: (topic: string) => void;
  selectDifficultyLevel: (level: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ setTopic, selectDifficultyLevel }) => {
  return (
    <div className='mt-10 w-full flex flex-col space-y-4'>
        <h2 className='text-lg font-semibold'>
            Start Building Your Personalized AI generated Material
        </h2>
        
        <Textarea 
            placeholder='Enter the topic you want to learn' 
            className='w-full min-h-[100px]'
            onChange={(e) => setTopic(e.target.value)}
        />
        
        <div className='mt-4 space-y-2'>
            <h2 className='text-lg font-semibold'>Select the difficulty level</h2>
            <Select onValueChange={selectDifficultyLevel}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='Easy'>Easy</SelectItem>
                    <SelectItem value='Medium'>Medium</SelectItem>
                    <SelectItem value='Hard'>Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default TopicInput

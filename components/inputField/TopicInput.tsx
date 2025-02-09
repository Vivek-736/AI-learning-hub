import React from 'react'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'

const TopicInput = () => {
  return (
    <div className='mt-10 w-full flex flex-col'>
        <h2 className=''>
            Start Building Your Personalized AI generated Material
        </h2>
        <Textarea placeholder='Enter the topic you want to learn' className='mt-2 w-full' />
        <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
        <Select>
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
  )
}

export default TopicInput

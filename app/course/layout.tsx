import DashboardHeader from '@/components/dashboard/DashboardHeader'
import React from 'react'

const CourseViewLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <DashboardHeader />
            <div className='mx-10 md:mx-36 lg:px-44 mt-10'>
                {children}
            </div>
        </div>
    )
}

export default CourseViewLayout

"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface HowItWorksStepProps {
  number: number
  title: string
  description: string
}

export default function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <motion.div
          className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{number}</span>
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

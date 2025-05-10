"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  color: string
  textColor: string
}

export default function FeatureCard({ title, description, icon, color, textColor }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-2">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <div className={textColor}>{icon}</div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

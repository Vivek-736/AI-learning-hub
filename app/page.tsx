"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import FeatureCard from "@/components/feature-card";
import TestimonialCard from "@/components/testimonial-card";
import HowItWorksStep from "@/components/how-it-works-step";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useUser();

  const features = [
    {
      title: "AI-Generated Courses",
      description:
        "Create personalized learning paths tailored to your specific needs and goals.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Smart Quizzes",
      description:
        "Generate quizzes that adapt to your knowledge level and learning progress.",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Instant Feedback",
      description:
        "Receive real-time feedback and suggestions to improve your learning experience.",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Define Your Goals",
      description:
        "Tell us what you want to learn and your current knowledge level.",
    },
    {
      number: 2,
      title: "AI Creates Your Path",
      description:
        "Our AI generates a personalized learning path with courses and resources.",
    },
    {
      number: 3,
      title: "Learn & Practice",
      description:
        "Study the materials and test your knowledge with adaptive quizzes.",
    },
    {
      number: 4,
      title: "Track Progress",
      description:
        "Monitor your improvement and receive suggestions for further learning.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Science Student",
      content:
        "The AI-generated courses helped me master Python in half the time it would have taken with traditional methods.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "The adaptive quizzes identified my knowledge gaps and helped me prepare for technical interviews effectively.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Professional",
      content:
        "I was able to learn digital marketing skills quickly with personalized courses that fit my busy schedule.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Learn Faster with{" "}
              <span className="text-purple-600 dark:text-purple-400">
                AI-Powered
              </span>{" "}
              Education
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Generate personalized courses and adaptive quizzes tailored to
              your learning style, pace, and goals. Master new skills
              efficiently with our AI learning platform.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Link href={isSignedIn ? `/dashboard` : `sign-in`}>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get Started
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <img
                src="/placeholder.png"
                alt="AI Learning Platform"
                className="relative z-10 mx-auto rounded-lg shadow-xl max-w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Supercharge Your Learning Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform offers innovative features to make
              learning more efficient and enjoyable.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our simple process gets you learning effectively in no time.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <HowItWorksStep {...step} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-grey-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have transformed their
              education with our platform.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-purple-600 dark:bg-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="h-12 w-12 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Join our platform today and discover the power of AI-assisted
              education. Start generating personalized courses and quizzes now.
            </p>
            <Link href={"/dashboard"}>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Start Learning Now 
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} AI Learning Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

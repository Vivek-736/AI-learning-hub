"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 px-4 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.a
              href="#"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="md:text-4xl text-xl font-bold text-purple-600 dark:text-purple-400">
                LearNova
              </span>
            </motion.a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg"
              >
                {isSignedIn ? "Dashboard" : "Log In"}
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : ""}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="pt-4 flex flex-col space-y-2">
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <Button variant="outline" size="sm" className="w-full">
                  {isSignedIn ? "Dashboard" : "Log in"}
                </Button>
              </Link>
              {!isSignedIn && (
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Sign up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

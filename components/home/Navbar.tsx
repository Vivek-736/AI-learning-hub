/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-violet-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold"><img src="/sth.jpg" alt="logo" className="h-20 my-[-7vh] border-indigo-500"/></div>
                <div className="hidden md:flex space-x-6 items-center text-white text-lg">
                    <Link href="/sign-in" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200">LogIn</Link>
                </div>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden text-white focus:outline-none text-2xl"
                >
                    &#9776;
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 p-4 bg-blue-700 text-white text-lg">
                    <a href="#" className="hover:underline underline-offset-8">Home</a>
                    <a href="#" className="hover:underline underline-offset-8">About Us</a>
                    <a href="#" className="hover:underline underline-offset-8">Contact</a>
                    <a href="#" className="hover:underline underline-offset-8">Explore Courses</a>
                    <a href="#" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200">Login/Signup</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

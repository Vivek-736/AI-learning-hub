/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-violet-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <img
            src="/sth.jpg"
            alt="logo"
            className="h-16 md:h-20 my-[-4vh] md:my-[-7vh] border-indigo-500"
          />
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center text-white text-lg">
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-in"}
            className="bg-white text-violet-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            {isSignedIn ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

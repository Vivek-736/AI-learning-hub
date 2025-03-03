"use client";
import Navbar from "@/components/home/Navbar";
import Intro from "@/components/home/Intro";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <Intro />
      <Footer />
    </div>
  );
}
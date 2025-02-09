"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

const Welcome = () => {
    const { user } = useUser();
    return (
        <div className="p-5 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-2">👋 Welcome, {user?.fullName}!</h1>
            <p className="text-lg">We&apos;re thrilled to have you here at the AI Powered Learning Hub. 🚀</p>
        </div>
    );
};

export default Welcome;

import React from "react";

const UpgradePage = () => {
  return (
    <div className="min-h-96 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x">
      <div className="text-center p-8 bg-white/90 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 pb-6">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          We&apos;re working hard to bring you something amazing! Stay tuned.
        </p>
      </div>
    </div>
  );
};

export default UpgradePage;

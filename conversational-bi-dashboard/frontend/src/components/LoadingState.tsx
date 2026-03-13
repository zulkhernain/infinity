"use client"

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-16 h-16 mb-6">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin"></div>
        {/* Middle spinning ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-600 border-r-pink-600 animate-spin" style={{animationDirection: 'reverse'}}></div>
        {/* Inner pulsing dot */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse"></div>
      </div>
      <p className="text-lg font-semibold bg-gradient-text">{message}</p>
      <div className="flex gap-1 mt-4">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
}

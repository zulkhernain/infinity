"use client"

import React from 'react';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 slide-in-${isUser ? 'right' : 'left'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl font-medium shadow-lg transform transition duration-300 hover:shadow-xl ${
          isUser
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none'
            : 'bg-gradient-to-r from-teal-100 to-cyan-100 text-gray-800 rounded-bl-none border-l-4 border-teal-500'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p
          className={`text-xs mt-2 font-normal ${
            isUser ? 'text-indigo-100' : 'text-gray-600'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

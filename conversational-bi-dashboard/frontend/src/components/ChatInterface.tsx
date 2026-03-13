"use client"

import React, { useState } from 'react';
import ChatMessage from './ChatMessage.tsx';
import ChatInput from './ChatInput.tsx';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  data?: any;
}

interface ChatInterfaceProps {
  onMessageSent?: () => void;
}

export default function ChatInterface({ onMessageSent }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMessageSend = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    onMessageSent?.();

    try {
      // Send to backend API
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        text: data.message,
        sender: 'assistant',
        timestamp: new Date(),
        data: data.data,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-white/50 to-white/30">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4 animate-bounce">💡</div>
            <p className="text-gray-600 font-bold text-lg">Start Your Data Journey</p>
            <p className="text-gray-400 text-sm mt-3 max-w-xs leading-relaxed">
              Upload a file and ask questions about your data to get started
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-purple-700">💬 Try asking:</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 bg-purple-50 rounded-lg px-3 py-2 border-l-2 border-purple-400">
                  📊 "What are the sales trends?"
                </div>
                <div className="text-xs text-gray-600 bg-indigo-50 rounded-lg px-3 py-2 border-l-2 border-indigo-400">
                  🎯 "Show me top performing regions"
                </div>
                <div className="text-xs text-gray-600 bg-cyan-50 rounded-lg px-3 py-2 border-l-2 border-cyan-400">
                  📈 "Compare categories"
                </div>
              </div>
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg rounded-bl-none px-4 py-3 max-w-xs shadow-lg border-l-4 border-teal-500">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/50 bg-white/50">
        <ChatInput onSend={handleMessageSend} disabled={loading} />
      </div>
    </div>
  );
}

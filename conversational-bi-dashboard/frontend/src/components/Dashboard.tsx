"use client"

import React, { useState, useEffect } from 'react';
import ChartRenderer from './ChartRenderer';
import ChatInterface from './ChatInterface';
import FileUpload from './FileUpload';
import Header from './Header';
import Stats from './Stats';

interface DashboardData {
  chartType?: string;
  data?: any;
  title?: string;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [csvPath, setCsvPath] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalMessages: 0,
    queriesProcessed: 0,
    chartsGenerated: 0,
  });

  const handleFileUpload = (filePath: string) => {
    setCsvPath(filePath);
    setStats(prev => ({ ...prev, chartsGenerated: prev.chartsGenerated + 1 }));
  };

  const handleMessageSent = () => {
    setStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-lavender via-purple-100 to-lavender">
      {/* Header */}
      <Header />

      {/* Stats Section */}
      <div className="px-6 pt-8">
        <Stats
          totalMessages={stats.totalMessages}
          queriesProcessed={stats.queriesProcessed}
          chartsGenerated={stats.chartsGenerated}
          uptime="24h"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Panel - Chat */}
          <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition duration-300">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💬</span>
                <div>
                  <h2 className="text-2xl font-bold">Chat with Data</h2>
                  <p className="text-indigo-100 text-sm">Ask questions, get instant insights</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-purple-100">
              <FileUpload onUpload={handleFileUpload} />
            </div>

            <div className="flex-1 overflow-hidden">
              <ChatInterface onMessageSent={handleMessageSent} />
            </div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition duration-300">
            <div className="p-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h2 className="text-2xl font-bold">Live Visualizations</h2>
                  <p className="text-cyan-100 text-sm">Real-time data insights</p>
                </div>
              </div>
            </div>

            {dashboardData ? (
              <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-white/50 to-white/30">
                <ChartRenderer
                  type={(dashboardData.chartType as 'bar' | 'line' | 'pie' | 'scatter') || 'bar'}
                  data={dashboardData.data}
                  title={dashboardData.title}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">📈</div>
                  <p className="text-gray-600 text-lg font-semibold">No data yet</p>
                  <p className="text-gray-400 text-sm mt-2 max-w-xs">
                    Upload a CSV file and ask a question to generate visualizations
                  </p>
                  <div className="mt-6 space-y-2">
                    <p className="text-xs text-purple-600 font-medium">Suggested questions:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• "What are the top categories?"</li>
                      <li>• "Show me the sales trend"</li>
                      <li>• "Compare regions"</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4 px-6">
        <p className="text-sm">✨ Powered by Google Gemini AI | Dashboard v1.0.0</p>
      </footer>
    </div>
  );
}

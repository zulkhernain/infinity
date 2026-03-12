"use client"

import React, { useState, useEffect } from 'react';
import ChartRenderer from './ChartRenderer';
import ChatInterface from './ChatInterface';
import FileUpload from './FileUpload';

interface DashboardData {
  chartType?: string;
  data?: any;
  title?: string;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [csvPath, setCsvPath] = useState<string | null>(null);

  const handleFileUpload = (filePath: string) => {
    setCsvPath(filePath);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Left Panel - Chat */}
      <div className="flex-1 lg:w-1/2 p-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Conversational BI</h2>
          <FileUpload onUpload={handleFileUpload} />
          <div className="flex-1 mt-4 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>

      {/* Right Panel - Visualization */}
      <div className="flex-1 lg:w-1/2 p-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Visualizations</h2>
          {dashboardData ? (
            <ChartRenderer
              type={(dashboardData.chartType as 'bar' | 'line' | 'pie' | 'scatter') || 'bar'}
              data={dashboardData.data}
              title={dashboardData.title}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-400">Charts will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

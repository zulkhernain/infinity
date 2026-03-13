"use client"

import React from 'react';

interface StatsProps {
  totalMessages?: number;
  queriesProcessed?: number;
  chartsGenerated?: number;
  uptime?: string;
}

export default function Stats({
  totalMessages = 0,
  queriesProcessed = 0,
  chartsGenerated = 0,
  uptime = "24h"
}: StatsProps) {
  const stats = [
    { label: 'Messages', value: totalMessages, icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { label: 'Queries', value: queriesProcessed, icon: '⚡', color: 'from-purple-500 to-pink-500' },
    { label: 'Charts', value: chartsGenerated, icon: '📈', color: 'from-green-500 to-teal-500' },
    { label: 'Uptime', value: uptime, icon: '🟢', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-4xl opacity-40">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

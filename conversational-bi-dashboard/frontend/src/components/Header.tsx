"use client"

import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">📊</div>
            <div>
              <h1 className="text-3xl font-bold">Conversational BI</h1>
              <p className="text-indigo-100 text-sm">AI-Powered Business Intelligence Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-indigo-100">Status</p>
              <p className="text-lg font-semibold">🟢 Active</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client"

import React, { ReactNode } from 'react';
import '@/index.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Conversational BI Dashboard</title>
      </head>
      <body className="bg-gray-50">
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ReactNode } from "react";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Conversational BI Dashboard",
  description: "AI-powered business intelligence dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

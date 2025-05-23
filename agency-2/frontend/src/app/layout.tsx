import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agency - AI Assistant for School Counselors',
  description: 'AI-powered counseling assistance features for school counselors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-[#1a2234] antialiased`}>
        {children}
      </body>
    </html>
  );
} 
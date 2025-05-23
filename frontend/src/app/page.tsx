'use client';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

export default function Home() {
  const [demoMode, setDemoMode] = useState(true);
  
  return (
    <main className="min-h-screen bg-[#1a2234] text-white p-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold">AI Demo Dashboard</h1>
        <p className="text-gray-400">Test our AI-powered counseling assistance features</p>
        
        {/* Info Box */}
        <div className="bg-[#2a3447] rounded-xl p-6 mt-6 space-y-4">
          <h2 className="text-xl font-semibold">What is Agency?</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Installable, local-first AI assistant for school counselors</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Automates admin tasks, centralizes student data, flags at-risk students</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Consent-based, privacy-first, and blockchain-audited</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Acts like a smart bot on your computer—always ready to help</span>
            </li>
          </ul>
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex items-center space-x-3 mt-6">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              demoMode ? 'bg-blue-600 text-white' : 'bg-[#2a3447] text-gray-400'
            }`}
            onClick={() => setDemoMode(true)}
          >
            Demo
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => setDemoMode(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-[#2a3447] checked:bg-blue-600 focus:ring-blue-600"
            />
            <span>Demo Mode (use sample data)</span>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-[#2a3447] p-1 mt-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-400 hover:bg-[#3a4457] hover:text-white'
                 }`
              }
            >
              Note Classification
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-400 hover:bg-[#3a4457] hover:text-white'
                 }`
              }
            >
              Risk Assessment
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Enter counseling note text:</h3>
                <textarea
                  className="w-full h-32 bg-[#1a2234] text-gray-200 rounded-lg p-4 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                />
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Classify Note Type</span>
                </button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Student Risk Assessment</h3>
                <p className="text-gray-400">Click the button below to run a risk assessment for a sample student (Grade 11).</p>
                <div className="flex justify-center py-8">
                  <div className="p-4 rounded-full bg-[#1a2234] border-2 border-gray-700">
                    <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6V4M8 4h8l-4-4-4 4z" />
                    </svg>
                  </div>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Run Risk Assessment</span>
                </button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
} 
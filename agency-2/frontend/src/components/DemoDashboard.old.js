'use client';
// agency-2/frontend/src/components/DemoDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
  Grid,
  Metric,
  ProgressBar,
} from '@tremor/react';
import { DocumentTextIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return 'rose';
    case 'Medium':
      return 'yellow';
    case 'Low':
      return 'emerald';
    default:
      return 'gray';
  }
};

const DEMO_NOTE = "Student expressed feeling overwhelmed with upcoming exams and mentioned trouble sleeping. Provided coping strategies and scheduled follow-up.";
const DEMO_NOTE_TYPE = "Wellness Check";
const DEMO_RISK = {
  riskLevel: "Medium",
  factors: {
    "Academic Stress": 0.65,
    "Attendance": 0.3,
    "Behavior": 0.2,
    "Family": 0.5,
  },
  recommendations: [
    "Schedule regular check-ins.",
    "Provide stress management resources.",
    "Monitor attendance and engagement."
  ]
};

const BACKEND_URL = 'http://localhost:5003';

export default function DemoDashboard() {
  const [text, setText] = useState('');
  const [noteType, setNoteType] = useState('');
  const [risk, setRisk] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState('');

  const handleDemo = () => {
    setText(DEMO_NOTE);
    setNoteType('');
    setRisk(null);
    setError('');
  };

  const handleNLP = async () => {
    setIsProcessing(true);
    setError('');
    if (demoMode) {
      setTimeout(() => {
        setNoteType(DEMO_NOTE_TYPE);
        setIsProcessing(false);
      }, 700);
      return;
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/api/note-type`, { text });
      setNoteType(res.data.noteType || res.data.result || 'Unknown');
    } catch (error) {
      setError('Backend unavailable. Showing demo result.');
      setNoteType(DEMO_NOTE_TYPE);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRisk = async () => {
    setIsProcessing(true);
    setError('');
    if (demoMode) {
      setTimeout(() => {
        setRisk(DEMO_RISK);
        setIsProcessing(false);
      }, 700);
      return;
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/api/risk`, { grade: 11, riskLevel_num: 2 });
      setRisk(res.data);
    } catch (error) {
      setError('Backend unavailable. Showing demo result.');
      setRisk(DEMO_RISK);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a2234] text-white p-8">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold">AI Demo Dashboard</h1>
        <p className="text-gray-400">Test our AI-powered counseling assistance features</p>
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
        <div className="flex items-center space-x-3 mt-6">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              text === DEMO_NOTE ? 'bg-blue-600 text-white' : 'bg-[#2a3447] text-gray-400'
            }`}
            onClick={handleDemo}
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
        {error && <Text className="text-red-500 mb-2">{error}</Text>}
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
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="w-full h-32 bg-[#1a2234] text-gray-200 rounded-lg p-4 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                />
                <button
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  onClick={handleNLP}
                  disabled={!text || isProcessing}
                >
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  <span>{isProcessing ? 'Classifying...' : 'Classify Note Type'}</span>
                </button>
                {noteType && (
                  <div className="mt-6">
                    <Text>Classification Result:</Text>
                    <div className="mt-2">
                      <Badge size="lg" color="blue">
                        {noteType}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Student Risk Assessment</h3>
                <p className="text-gray-400">Click the button below to run a risk assessment for a sample student (Grade 11).</p>
                <div className="flex justify-center py-8">
                  <div className="p-4 rounded-full bg-[#1a2234] border-2 border-gray-700">
                    <ShieldExclamationIcon className="w-16 h-16 text-blue-500" />
                  </div>
                </div>
                <button
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center disabled:opacity-50"
                  onClick={handleRisk}
                  disabled={isProcessing}
                >
                  <ShieldExclamationIcon className="w-5 h-5 mr-2" />
                  <span>{isProcessing ? 'Assessing...' : 'Run Risk Assessment'}</span>
                </button>
                {risk && (
                  <div className="space-y-6">
                    <div>
                      <Text>Risk Level:</Text>
                      <div className="mt-2">
                        <Badge size="lg" color={getRiskColor(risk.riskLevel)}>
                          {risk.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Text>Risk Factors:</Text>
                      <Grid numItems={1} numItemsSm={2} className="gap-4 mt-2">
                        {Object.entries(risk.factors || {}).map(([factor, value]) => (
                          <Card key={factor} decoration="top" decorationColor={value > 0.7 ? "rose" : value > 0.4 ? "yellow" : "emerald"}>
                            <Text>{factor}</Text>
                            <Metric>{(value * 100).toFixed(0)}%</Metric>
                            <ProgressBar value={value * 100} color={value > 0.7 ? "rose" : value > 0.4 ? "yellow" : "emerald"} className="mt-2" />
                          </Card>
                        ))}
                      </Grid>
                    </div>
                    {risk.recommendations && (
                      <div>
                        <Text>Recommendations:</Text>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {risk.recommendations.map((rec, index) => (
                            <li key={index} className="text-gray-300">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
}
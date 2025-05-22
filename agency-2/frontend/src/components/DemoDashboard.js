'use client';
// agency-2/frontend/src/components/DemoDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Title,
  Text,
  TextInput,
  Badge,
  Button,
  Grid,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import { DocumentTextIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

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
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>AI Demo Dashboard</Title>
      <Text className="mb-2">Test our AI-powered counseling assistance features</Text>
      <Card className="mb-6 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
        <Text className="font-semibold">What is Agency?</Text>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
          <li>Installable, local-first AI assistant for school counselors</li>
          <li>Automates admin tasks, centralizes student data, flags at-risk students</li>
          <li>Consent-based, privacy-first, and blockchain-audited</li>
          <li>Acts like a smart bot on your computer—always ready to help</li>
        </ul>
      </Card>
      <div className="flex items-center gap-4 mb-2">
        <Button size="xs" onClick={handleDemo} color="blue">Demo</Button>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input type="checkbox" checked={demoMode} onChange={e => setDemoMode(e.target.checked)} />
          Demo Mode (use sample data)
        </label>
      </div>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      <TabGroup className="mt-2">
        <TabList>
          <Tab>Note Classification</Tab>
          <Tab>Risk Assessment</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card className="mt-6">
              <div className="space-y-6">
                <div>
                  <Text>Enter counseling note text:</Text>
                  <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900"
                    rows={4}
                    placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                  />
                </div>
                <Button
                  icon={DocumentTextIcon}
                  loading={isProcessing}
                  onClick={handleNLP}
                  disabled={!text || isProcessing}
                >
                  Classify Note Type
                </Button>
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
            </Card>
          </TabPanel>
          <TabPanel>
            <Card className="mt-6">
              <div className="space-y-6">
                <div>
                  <Text>Student Risk Assessment</Text>
                  <Text className="text-gray-500">
                    Click the button below to run a risk assessment for a sample student (Grade 11).
                  </Text>
                </div>
                <Button
                  icon={ShieldExclamationIcon}
                  loading={isProcessing}
                  onClick={handleRisk}
                  disabled={isProcessing}
                >
                  Run Risk Assessment
                </Button>
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
                            <li key={index} className="text-gray-600">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
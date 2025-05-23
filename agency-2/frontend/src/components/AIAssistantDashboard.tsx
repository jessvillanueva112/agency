import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Badge, Button, Card, Grid, Metric, ProgressBar, Text, Title } from '@tremor/react';
import { DocumentTextIcon, ShieldExclamationIcon, UserGroupIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { runAIDemo } from '../services/aiAssistant';

const getRiskColor = (riskLevel: string) => {
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

const DEMO_CONTEXT = {
  studentId: '123',
  studentName: 'Jane Doe',
  counselorId: 'c456',
};

export default function AIAssistantDashboard() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoMode, setDemoMode] = useState(true);

  const handleRunDemo = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await runAIDemo(input || 'Student reported feeling anxious after class.', DEMO_CONTEXT);
      setResult(data);
    } catch (err: any) {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-tremor-background-muted to-tremor-background-subtle dark:from-dark-tremor-background dark:to-dark-tremor-background py-8 px-2">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl p-0 border-0 bg-white/90 dark:bg-[#1a2234]/90">
        <div className="p-8 pb-4 border-b border-tremor-border dark:border-dark-tremor-border">
          <Title className="text-3xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-2">AI Demo Dashboard</Title>
          <Text className="text-tremor-content-subtle dark:text-dark-tremor-content-subtle mb-4">Test our AI-powered counseling assistance features</Text>
          <Card className="bg-tremor-brand-faint dark:bg-dark-tremor-brand-faint rounded-xl p-6 mt-2 mb-2 shadow-none border-0">
            <Title className="text-lg font-semibold text-tremor-brand-emphasis dark:text-dark-tremor-brand-emphasis mb-2">What is Agency?</Title>
            <ul className="list-disc pl-6 space-y-1 text-tremor-content dark:text-dark-tremor-content">
              <li>Installable, local-first AI assistant for school counselors</li>
              <li>Automates admin tasks, centralizes student data, flags at-risk students</li>
              <li>Consent-based, privacy-first, and blockchain-audited</li>
              <li>Acts like a smart bot on your computer—always ready to help</li>
            </ul>
          </Card>
          <div className="flex items-center space-x-4 mt-4">
            <Button color="blue" onClick={handleRunDemo} loading={loading} className="transition-all shadow hover:scale-105">
              Demo
            </Button>
            <label className="flex items-center space-x-2 text-sm text-tremor-content-subtle dark:text-dark-tremor-content-subtle cursor-pointer">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={e => setDemoMode(e.target.checked)}
                className="w-4 h-4 rounded border-tremor-border dark:border-dark-tremor-border bg-tremor-background checked:bg-blue-600 focus:ring-blue-600 transition-all"
              />
              <span>Demo Mode (use sample data)</span>
            </label>
          </div>
          {error && <Text className="text-red-500 mt-2">{error}</Text>}
        </div>
        <div className="p-8">
          <Tab.Group>
            <Tab.List className="flex space-x-2 rounded-lg bg-tremor-background-muted dark:bg-dark-tremor-background-muted p-1 mb-6">
              {['Note Classification', 'Risk Assessment', 'Crisis Response', 'Consent & Audit', 'Support Plan'].map(tab => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5 transition-all
                     ${selected
                       ? 'bg-blue-600 text-white shadow-lg scale-105'
                       : 'text-tremor-content-subtle dark:text-dark-tremor-content-subtle hover:bg-tremor-brand-faint dark:hover:bg-dark-tremor-brand-faint hover:text-tremor-content-strong dark:hover:text-dark-tremor-content-strong'}
                    `
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {/* Note Classification Tab */}
              <Tab.Panel>
                <Card className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-xl p-6 shadow border-0">
                  <Title className="text-lg font-medium mb-2">Enter counseling note text:</Title>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="w-full h-32 bg-tremor-background dark:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content rounded-lg p-4 border border-tremor-border dark:border-dark-tremor-border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all mb-4"
                    placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                  />
                  <Button color="blue" onClick={handleRunDemo} loading={loading} className="flex items-center space-x-2">
                    <DocumentTextIcon className="w-5 h-5 mr-2" />
                    {loading ? 'Classifying...' : 'Classify Note Type'}
                  </Button>
                  {result?.doc && (
                    <div className="mt-6">
                      <Text>Classification Result:</Text>
                      <div className="mt-2">
                        <Badge size="lg" color="blue">
                          {result.doc.formatted}
                        </Badge>
                      </div>
                    </div>
                  )}
                </Card>
              </Tab.Panel>
              {/* Risk Assessment Tab */}
              <Tab.Panel>
                <Card className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-xl p-6 shadow border-0">
                  <Title className="text-lg font-medium mb-2">Student Risk Assessment</Title>
                  <Text className="mb-4">Click the button below to run a risk assessment for a sample student (Grade 11).</Text>
                  <div className="flex justify-center py-4">
                    <div className="p-4 rounded-full bg-tremor-background dark:bg-dark-tremor-background border-2 border-tremor-border dark:border-dark-tremor-border">
                      <ShieldExclamationIcon className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                  <Button color="blue" onClick={handleRunDemo} loading={loading} className="flex items-center space-x-2 mb-4">
                    <ShieldExclamationIcon className="w-5 h-5 mr-2" />
                    {loading ? 'Assessing...' : 'Run Risk Assessment'}
                  </Button>
                  {result?.crisis && (
                    <div className="space-y-6">
                      <div>
                        <Text>Risk Level:</Text>
                        <div className="mt-2">
                          <Badge size="lg" color={getRiskColor('Medium')}>
                            Medium Risk
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Text>Risk Factors:</Text>
                        <Grid numItems={1} numItemsSm={2} className="gap-4 mt-2">
                          <Card decoration="top" decorationColor="yellow">
                            <Text>Academic Stress</Text>
                            <Metric>65%</Metric>
                            <ProgressBar value={65} color="yellow" className="mt-2" />
                          </Card>
                          <Card decoration="top" decorationColor="teal">
                            <Text>Attendance</Text>
                            <Metric>30%</Metric>
                            <ProgressBar value={30} color="teal" className="mt-2" />
                          </Card>
                          <Card decoration="top" decorationColor="emerald">
                            <Text>Behavior</Text>
                            <Metric>20%</Metric>
                            <ProgressBar value={20} color="emerald" className="mt-2" />
                          </Card>
                          <Card decoration="top" decorationColor="yellow">
                            <Text>Family</Text>
                            <Metric>50%</Metric>
                            <ProgressBar value={50} color="yellow" className="mt-2" />
                          </Card>
                        </Grid>
                      </div>
                      <div>
                        <Text>Recommendations:</Text>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-tremor-content dark:text-dark-tremor-content">
                          <li>Schedule regular check-ins.</li>
                          <li>Provide stress management resources.</li>
                          <li>Monitor attendance and engagement.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </Card>
              </Tab.Panel>
              {/* Crisis Response Tab */}
              <Tab.Panel>
                <Card className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-xl p-6 shadow border-0 flex flex-col items-center justify-center min-h-[200px]">
                  <Title className="text-lg font-medium mb-2">Crisis Response (Coming Soon)</Title>
                  <Text className="text-tremor-content-subtle dark:text-dark-tremor-content-subtle">Guided crisis response workflows will appear here.</Text>
                </Card>
              </Tab.Panel>
              {/* Consent & Audit Tab */}
              <Tab.Panel>
                <Card className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-xl p-6 shadow border-0 flex flex-col items-center justify-center min-h-[200px]">
                  <Title className="text-lg font-medium mb-2">Consent & Audit (Coming Soon)</Title>
                  <Text className="text-tremor-content-subtle dark:text-dark-tremor-content-subtle">Consent management and blockchain audit logs will appear here.</Text>
                </Card>
              </Tab.Panel>
              {/* Support Plan Tab */}
              <Tab.Panel>
                <Card className="bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-xl p-6 shadow border-0 flex flex-col items-center justify-center min-h-[200px]">
                  <Title className="text-lg font-medium mb-2">Support Plan (Coming Soon)</Title>
                  <Text className="text-tremor-content-subtle dark:text-dark-tremor-content-subtle">Personalized support plans and recommendations will appear here.</Text>
                </Card>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Card>
    </div>
  );
} 
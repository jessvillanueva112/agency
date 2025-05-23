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
          <Button color="blue" onClick={handleRunDemo} loading={loading}>
            Demo
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={demoMode}
              onChange={e => setDemoMode(e.target.checked)}
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
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-400 hover:bg-[#3a4457] hover:text-white'
                 }`
              }
            >
              Crisis Response
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
              Consent & Audit
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
              Support Plan
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Enter counseling note text:</h3>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full h-32 bg-[#1a2234] text-gray-200 rounded-lg p-4 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                />
                <Button color="blue" onClick={handleRunDemo} loading={loading}>
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
                <Button color="blue" onClick={handleRunDemo} loading={loading}>
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
                        <Card decoration="top" decorationColor="emerald">
                          <Text>Attendance</Text>
                          <Metric>30%</Metric>
                          <ProgressBar value={30} color="emerald" className="mt-2" />
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
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-gray-300">Schedule regular check-ins.</li>
                        <li className="text-gray-300">Provide stress management resources.</li>
                        <li className="text-gray-300">Monitor attendance and engagement.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Crisis Response Workflow</h3>
                {result?.crisis && (
                  <ul className="list-decimal pl-5 mt-2 space-y-2">
                    {result.crisis.steps.map((step: string, idx: number) => (
                      <li key={idx} className="text-gray-300">{step}</li>
                    ))}
                  </ul>
                )}
                <Button color="blue" onClick={handleRunDemo} loading={loading}>
                  <CheckBadgeIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Processing...' : 'Run Crisis Workflow'}
                </Button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Consent & Blockchain Audit</h3>
                <p className="text-gray-400">Show consent status and blockchain audit logs here.</p>
                {/* TODO: Integrate real consent and blockchain data */}
                <Button color="blue" onClick={handleRunDemo} loading={loading}>
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Checking...' : 'Check Consent'}
                </Button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-[#2a3447] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-medium">Student Support Plan</h3>
                <p className="text-gray-400">Auto-generate a support plan for the student based on risk and needs.</p>
                {/* TODO: Integrate real support plan logic */}
                <Button color="blue" onClick={handleRunDemo} loading={loading}>
                  <CheckBadgeIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Generating...' : 'Generate Support Plan'}
                </Button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
} 
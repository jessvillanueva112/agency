import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Badge, Button, Card, Grid, Metric, ProgressBar, Text, Title } from '@tremor/react';
import { DocumentTextIcon, ShieldExclamationIcon, UserGroupIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
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

// Add a function to get badge color and text color based on risk level
const getRiskBadgeStyle = (riskLevel: string) => {
  switch (riskLevel) {
    case 'High Risk':
      return 'bg-red-500 text-white';
    case 'Medium Risk':
      return 'bg-yellow-400 text-black';
    case 'Low Risk':
      return 'bg-emerald-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
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
    <div className="min-h-screen bg-[#1a2234] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-4 font-sans">
        <h1 className="text-3xl font-semibold font-sans">AI Demo Dashboard</h1>
        <p className="text-gray-400 font-sans">Test our AI-powered counseling assistance features</p>
        {/* What is Agency Section - Hero Card Polished */}
        <div className="w-full flex justify-center">
          <div className="bg-[#232c43]/80 backdrop-blur-xl border border-[#334155] rounded-3xl shadow-2xl px-10 py-12 mt-10 mb-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg text-center">What is Agency?</h2>
            <p className="text-2xl text-blue-200 font-semibold italic text-center">Your AI-powered assistant for school counselors</p>
            <ul className="flex flex-col gap-5 w-full mt-2">
              <li className="flex items-center gap-4 text-gray-200 text-lg">
                <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
                <span>Installable, local-first AI assistant for school counselors</span>
              </li>
              <li className="flex items-center gap-4 text-gray-200 text-lg">
                <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
                <span>Automates admin tasks, centralizes student data, flags at-risk students</span>
              </li>
              <li className="flex items-center gap-4 text-gray-200 text-lg">
                <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
                <span>Consent-based, privacy-first, and blockchain-audited</span>
              </li>
              <li className="flex items-center gap-4 text-gray-200 text-lg">
                <CheckCircleIcon className="w-7 h-7 text-blue-400 flex-shrink-0" />
                <span>Acts like a smart bot on your computer—always ready to help</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-6">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${input ? 'bg-blue-600 text-white' : 'bg-[#2a3447] text-gray-400'}`}
            onClick={handleRunDemo}
          >
            Demo
          </button>
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
            {['Note Classification', 'Risk Assessment', 'Crisis Response', 'Consent & Audit', 'Support Plan'].map(tab => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                   ${selected 
                     ? 'bg-blue-600 text-white shadow'
                     : 'text-gray-400 hover:bg-[#3a4457] hover:text-white'
                   }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {/* Note Classification Tab */}
            <Tab.Panel>
              <Card className="bg-[#232c43] rounded-xl p-6 shadow border-0">
                <Title className="text-lg font-medium mb-2 text-white">Enter counseling note text:</Title>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full h-32 bg-[#1a2234] text-gray-200 rounded-lg p-4 border border-[#334155] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all mb-4"
                  placeholder="e.g. Student expressed feeling anxious about exams. Provided coping strategies and scheduled follow-up."
                />
                <Button color="blue" onClick={handleRunDemo} loading={loading} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Classifying...' : 'Classify Note Type'}
                </Button>
                {result?.doc && (
                  <div className="mt-6">
                    <Text className="text-white">Classification Result:</Text>
                    <div className="mt-2">
                      <div className="classification-badge animate-popIn">
                        {result.doc.formatted}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </Tab.Panel>
            {/* Risk Assessment Tab */}
            <Tab.Panel>
              <Card className="bg-[#232c43] rounded-xl p-6 shadow border-0">
                <Title className="text-lg font-medium mb-2 text-white">Student Risk Assessment</Title>
                <Text className="mb-4 text-gray-400">Click the button below to run a risk assessment for a sample student (Grade 11).</Text>
                <div className="flex justify-center py-4">
                  <div className="p-4 rounded-full bg-[#1a2234] border-2 border-[#334155]">
                    <ShieldExclamationIcon className="w-16 h-16 text-blue-500" />
                  </div>
                </div>
                <Button color="blue" onClick={handleRunDemo} loading={loading} className="flex items-center space-x-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white">
                  <ShieldExclamationIcon className="w-5 h-5 mr-2" />
                  {loading ? 'Assessing...' : 'Run Risk Assessment'}
                </Button>
                {result?.crisis && (
                  <div className="space-y-6">
                    <div>
                      <Text className="text-white">Risk Level:</Text>
                      <div className="flex items-center gap-2 mt-4">
                        <span className={`font-bold px-4 py-2 rounded-lg text-lg shadow ${getRiskBadgeStyle(result.crisis.riskLevel)}`}>{result.crisis.riskLevel}</span>
                      </div>
                    </div>
                    <div>
                      <Text className="text-white">Risk Factors:</Text>
                      <Grid numItems={1} numItemsSm={2} className="gap-4 mt-2">
                        <Card decoration="top" decorationColor="yellow">
                          <Text>Academic Stress</Text>
                          <Metric>65%</Metric>
                          <ProgressBar value={65} color="yellow" className="mt-2" data-color="yellow" />
                        </Card>
                        <Card decoration="top" decorationColor="teal">
                          <Text>Attendance</Text>
                          <Metric>30%</Metric>
                          <ProgressBar value={30} color="teal" className="mt-2" data-color="teal" />
                        </Card>
                        <Card decoration="top" decorationColor="emerald">
                          <Text>Behavior</Text>
                          <Metric>20%</Metric>
                          <ProgressBar value={20} color="emerald" className="mt-2" data-color="emerald" />
                        </Card>
                        <Card decoration="top" decorationColor="yellow">
                          <Text>Family</Text>
                          <Metric>50%</Metric>
                          <ProgressBar value={50} color="yellow" className="mt-2" data-color="yellow" />
                        </Card>
                      </Grid>
                    </div>
                    <div>
                      <Text className="text-white">Recommendations:</Text>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
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
              <Card className="bg-[#232c43] rounded-xl p-6 shadow border-0 flex flex-col gap-6">
                <Title className="text-lg font-medium mb-2 text-white flex items-center gap-2">
                  <ShieldExclamationIcon className="w-6 h-6 text-yellow-400" />
                  Crisis Response Workflow
                </Title>
                <Text className="text-gray-400 mb-4">Follow the guided steps below to ensure a complete, compliant crisis response. All actions are logged and privacy is enforced at every step.</Text>
                <div className="flex flex-col gap-4">
                  {/* Step 1: AI-Flagged Student */}
                  <Card className="bg-[#1a2234] border-l-4 border-blue-500 flex flex-row items-center gap-4 p-4">
                    <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">1. Student flagged as at-risk by AI or manual review</Text>
                      <Text className="text-gray-400 text-sm">AI monitors all data sources and flags urgent needs. Manual review always possible.</Text>
                    </div>
                  </Card>
                  {/* Step 2: Timeline Review */}
                  <Card className="bg-[#1a2234] border-l-4 border-blue-500 flex flex-row items-center gap-4 p-4">
                    <UserGroupIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">2. Review student timeline & intervention history</Text>
                      <Text className="text-gray-400 text-sm">Counselor reviews all past interventions, notes, and risk events in a unified timeline.</Text>
                    </div>
                  </Card>
                  {/* Step 3: Schedule Intervention */}
                  <Card className="bg-[#1a2234] border-l-4 border-blue-500 flex flex-row items-center gap-4 p-4">
                    <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">3. Schedule meeting/intervention & add to timeline</Text>
                      <Text className="text-gray-400 text-sm">AI suggests optimal times. All actions are logged and visible to stakeholders (with consent).</Text>
                    </div>
                  </Card>
                  {/* Step 4: Consent Workflow */}
                  <Card className="bg-[#1a2234] border-l-4 border-yellow-400 flex flex-row items-center gap-4 p-4">
                    <ShieldExclamationIcon className="w-6 h-6 text-yellow-400" />
                    <div>
                      <Text className="text-white font-semibold">4. Trigger digital consent workflow if external input needed</Text>
                      <Text className="text-gray-400 text-sm">Consent is collected digitally, stored on blockchain, and required before sharing info externally.</Text>
                    </div>
                  </Card>
                  {/* Step 5: Import & Analyze External Data */}
                  <Card className="bg-[#1a2234] border-l-4 border-emerald-400 flex flex-row items-center gap-4 p-4">
                    <UserGroupIcon className="w-6 h-6 text-emerald-400" />
                    <div>
                      <Text className="text-white font-semibold">5. Import, merge, and analyze external provider data</Text>
                      <Text className="text-gray-400 text-sm">EHR, MyEdBC, and other data sources are securely imported and analyzed for risk and support needs.</Text>
                    </div>
                  </Card>
                  {/* Step 6: Document & Communicate */}
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-row items-center gap-4 p-4">
                    <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">6. Document next steps & communicate with stakeholders</Text>
                      <Text className="text-gray-400 text-sm">AI assists with documentation, ensures privacy, and automates notifications to parents, staff, and agencies (with consent).</Text>
                    </div>
                  </Card>
                  {/* Step 7: Schedule Follow-up */}
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-row items-center gap-4 p-4">
                    <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">7. Schedule follow-up and monitor progress</Text>
                      <Text className="text-gray-400 text-sm">AI schedules reminders and tracks ongoing support, closing the loop on the crisis workflow.</Text>
                    </div>
                  </Card>
                </div>
              </Card>
            </Tab.Panel>
            {/* Consent & Audit Tab */}
            <Tab.Panel>
              <Card className="bg-[#232c43] rounded-xl p-6 shadow border-0 flex flex-col gap-6">
                <Title className="text-lg font-medium mb-2 text-white flex items-center gap-2">
                  <ShieldExclamationIcon className="w-6 h-6 text-emerald-400" />
                  Consent & Audit
                </Title>
                <Text className="text-gray-400 mb-4">All consent and audit events are tracked on blockchain for tamper-proof compliance and transparency.</Text>
                <div className="flex flex-col gap-4">
                  <Card className="bg-[#1a2234] border-l-4 border-emerald-400 flex flex-row items-center gap-4 p-4">
                    <CheckBadgeIcon className="w-6 h-6 text-emerald-400" />
                    <div>
                      <Text className="text-white font-semibold">Consent Status: <span className='text-emerald-400'>Granted</span></Text>
                      <Text className="text-gray-400 text-sm">Digital consent collected and stored as immutable blockchain record.</Text>
                    </div>
                    <Button color="emerald" className="ml-auto">View Blockchain Record</Button>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-row items-center gap-4 p-4">
                    <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">Audit Log</Text>
                      <Text className="text-gray-400 text-sm">All data access, edits, and sharing events are logged and verifiable.</Text>
                    </div>
                    <Button color="blue" className="ml-auto">View Audit Trail</Button>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-yellow-400 flex flex-row items-center gap-4 p-4">
                    <ShieldExclamationIcon className="w-6 h-6 text-yellow-400" />
                    <div>
                      <Text className="text-white font-semibold">Access Control</Text>
                      <Text className="text-gray-400 text-sm">Permissions enforced by blockchain smart contracts. Only authorized users can access sensitive data.</Text>
                    </div>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-row items-center gap-4 p-4">
                    <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                    <div>
                      <Text className="text-white font-semibold">Data Integrity Verification</Text>
                      <Text className="text-gray-400 text-sm">Document hashes stored on blockchain. Verify documents are unaltered since creation.</Text>
                    </div>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-emerald-400 flex flex-row items-center gap-4 p-4">
                    <UserGroupIcon className="w-6 h-6 text-emerald-400" />
                    <div>
                      <Text className="text-white font-semibold">Encrypted Local Synchronization</Text>
                      <Text className="text-gray-400 text-sm">Device-to-device encrypted sync keeps data private and mobile, FIPPA-compliant.</Text>
                    </div>
                  </Card>
                </div>
              </Card>
            </Tab.Panel>
            {/* Support Plan Tab */}
            <Tab.Panel>
              <Card className="bg-[#232c43] rounded-xl p-6 shadow border-0 flex flex-col gap-6">
                <Title className="text-lg font-medium mb-2 text-white flex items-center gap-2">
                  <UserGroupIcon className="w-6 h-6 text-blue-400" />
                  Support Plan Builder
                </Title>
                <Text className="text-gray-400 mb-4">Create and manage personalized support plans for students. Add goals, interventions, stakeholders, and schedule follow-ups.</Text>
                <div className="flex flex-col gap-4">
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-col gap-2 p-4">
                    <Text className="text-white font-semibold">Student Goals</Text>
                    <ul className="list-disc pl-6 text-gray-300">
                      <li>Improve attendance and engagement</li>
                      <li>Reduce academic stress</li>
                      <li>Enhance emotional well-being</li>
                    </ul>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-emerald-400 flex flex-col gap-2 p-4">
                    <Text className="text-white font-semibold">Interventions</Text>
                    <ul className="list-disc pl-6 text-gray-300">
                      <li>Weekly check-ins with counselor</li>
                      <li>Referral to school psychologist</li>
                      <li>Parent-teacher conference</li>
                    </ul>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-yellow-400 flex flex-col gap-2 p-4">
                    <Text className="text-white font-semibold">Stakeholders</Text>
                    <ul className="list-disc pl-6 text-gray-300">
                      <li>Student</li>
                      <li>Parent/Guardian</li>
                      <li>Counselor</li>
                      <li>External Provider</li>
                    </ul>
                  </Card>
                  <Card className="bg-[#1a2234] border-l-4 border-blue-400 flex flex-col gap-2 p-4">
                    <Text className="text-white font-semibold">Follow-Up & Timeline</Text>
                    <ul className="list-disc pl-6 text-gray-300">
                      <li>Next check-in: <span className="text-blue-400">2024-06-10</span></li>
                      <li>Review progress at end of term</li>
                    </ul>
                  </Card>
                </div>
              </Card>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 
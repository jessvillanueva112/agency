import axios from 'axios';

const BASE_URL = 'http://localhost:5003/api/ai-assistant';
const AUTH_HEADER = { Authorization: 'Bearer agencytoken112secretshh' };

export async function runAIDemo(input: string, context: any) {
  const res = await axios.post(
    `${BASE_URL}/demo`,
    { input, context },
    { headers: AUTH_HEADER }
  );
  return res.data;
}

// Placeholder for future workflows
export async function runSupportPlan(context: any) {
  // TODO: Implement backend and call here
  return { plan: 'Sample support plan', context };
}

export async function runConsentWorkflow(context: any) {
  // TODO: Implement backend and call here
  return { consent: 'Sample consent workflow', context };
}

export async function runCrisisWorkflow(context: any) {
  // TODO: Implement backend and call here
  return { crisis: 'Sample crisis workflow', context };
} 
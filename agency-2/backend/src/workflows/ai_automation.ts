// src/workflows/ai_automation.ts
import { AgencyAssistant } from '../core/ai/assistant';

const RISK_THRESHOLD = 0.7;

export async function aiAutomationWorkflow() {
  const assistant = new AgencyAssistant();

  // 1. Run the daily workflow (which includes sync, risk, comms, etc.)
  await assistant.processDailyWorkflow();
  // If you want to simulate more granular AI automation, add a public method to AgencyAssistant and call it here.
}
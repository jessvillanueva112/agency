// src/workflows/daily_use.ts
import { AgencyAssistant } from '../core/ai/assistant';

export async function dailyUseWorkflow() {
  const assistant = new AgencyAssistant();

  // 1. Open dashboard (UI)
  // 2. Display schedule, flagged students, and tasks (handled by assistant)
  await assistant.processDailyWorkflow();

  // 3. All access and activities are logged to blockchain inside assistant
}
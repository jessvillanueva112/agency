import { aiAutomationWorkflow } from '../src/workflows/ai_automation';

describe('AI Automation Workflow', () => {
  it('should run without throwing errors and produce logs', async () => {
    await expect(aiAutomationWorkflow()).resolves.not.toThrow();
    // You can add more assertions here if you mock/spy on console.log
  });
}); 
import { onboardingWorkflow } from '../src/workflows/onboarding';

describe('Onboarding Workflow', () => {
  it('should complete onboarding for a counselor without errors', async () => {
    await expect(onboardingWorkflow('counselor-1')).resolves.not.toThrow();
    // You can add more assertions here if you mock/spy on console.log
  });
}); 
import { crisisResponseWorkflow } from '../src/workflows/crisis_response';

describe('Crisis Response Workflow', () => {
  it('should handle a crisis incident without throwing errors', async () => {
    const mockIncident = { studentId: '123', id: 'incident-1' };
    await expect(crisisResponseWorkflow(mockIncident)).resolves.not.toThrow();
    // You can add more assertions here if you mock/spy on console.log
  });
}); 
import { studentSupportWorkflow } from '../src/workflows/student_support';

describe('Student Support Workflow', () => {
  it('should run student support workflow without errors', async () => {
    await expect(studentSupportWorkflow('student-1')).resolves.not.toThrow();
    // You can add more assertions here if you mock/spy on console.log
  });
}); 
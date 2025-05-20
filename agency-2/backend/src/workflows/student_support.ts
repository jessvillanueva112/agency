// src/workflows/student_support.ts

import { DataSyncManager } from '../core/data/sync';
import { RiskAssessment } from '../core/ai/risk_assessment';
import { TaskAutomation } from '../core/ai/task_automation';
import { CommunicationManager } from '../services/communication';

/**
 * Orchestrates the student support workflow.
 */
export async function studentSupportWorkflow(studentId: string) {
  // 1. Data Collection
  const dataSync = new DataSyncManager();
  const studentData = await dataSync.syncLocalData();

  // 2. Risk Assessment
  const riskAssessment = new RiskAssessment();
  const riskResults = await riskAssessment.analyzeStudentData(studentData);

  // 3. Action Planning
  const taskAutomation = new TaskAutomation();
  for (const result of riskResults) {
    if (result.risk > 0.7) {
      await taskAutomation.automateTask({
        studentId: result.studentId,
        action: 'Schedule intervention meeting',
        suggestion: result.suggestion
      });
    }
  }

  // 4. Follow-up
  const communication = new CommunicationManager();
  await communication.notifyCounselors({
    type: 'tutorial',
    message: 'Student support workflow completed.',
    severity: 'info'
  });
} 
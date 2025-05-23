import { DataSyncManager } from '../data/sync';
import { TaskAutomation } from './task_automation';
import { RiskAssessment } from './risk_assessment';
import { CommunicationManager } from '../../services/communication';
import { PrivacyManager } from '../privacy/consent';
import { BlockchainManager } from '../blockchain/manager';
import { DocumentationStandardizer } from '../documentation/standardizer';

// Import new AI modules
import { suggestSchedule } from './smart_scheduling';
import { aggregateCommunications } from './communication_hub';
import { getStudentLocation } from './student_location';
import { documentNote } from './documentation_assistant';
import { runCrisisWorkflow } from './crisis_workflow';

export class AgencyAssistant {
  private dataSync = new DataSyncManager();
  private taskAutomation = new TaskAutomation();
  private riskAssessment = new RiskAssessment();
  private communication = new CommunicationManager();
  private privacy = new PrivacyManager();
  private blockchain = new BlockchainManager();
  private documentation = new DocumentationStandardizer();

  async processDailyWorkflow() {
    try {
      // 1. Sync and process data
      await this.dataSync.syncLocalData();
      await this.communication.processIncoming();
  
      // 2. Automate tasks
      await this.taskAutomation.identifyAndAutomate();
      await this.taskAutomation.scheduleFollowUps();
  
      // 3. Assess student needs
      await this.riskAssessment.analyzeStudentData();
      await this.riskAssessment.flagAtRiskStudents();
  
      // 4. Manage communications
      await this.communication.consolidateMessages();
      await this.communication.coordinateWithProviders();
  
      // 5. Enforce privacy
      await this.privacy.audit();

      // 6. Blockchain: log audit
      await BlockchainManager.logAuditEvent('daily_workflow', { timestamp: new Date() });

      // 7. Standardize documentation
      await this.documentation.standardizeAll();

    } catch (error) {
      console.error('Error in daily workflow:', error);
      await this.communication.notifyCounselors({
        type: 'system_alert',
        message: `Workflow error: ${error instanceof Error ? error.message : error}`,
        severity: 'high'
      });
    }
  }

  // New: Orchestrate all core AI features for demo/testing
  async processAIOrchestration(input: string, context: any) {
    // Smart Scheduling
    const schedule = await suggestSchedule(context);
    // Communication Hub
    const comms = await aggregateCommunications(context);
    // Student Location
    const location = await getStudentLocation(context.studentId);
    // Documentation Assistant
    const doc = await documentNote(input, context);
    // Crisis Workflow
    const crisis = await runCrisisWorkflow(context);

    return {
      schedule,
      comms,
      location,
      doc,
      crisis,
    };
  }
}
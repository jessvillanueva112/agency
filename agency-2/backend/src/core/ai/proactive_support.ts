import { RiskAssessment } from './risk_assessment';
import { CommunicationManager } from '../../services/communication';
import { Student, RiskLevel, Intervention } from '../../types/student';

/**
 * Proactively monitors student status and prioritizes cases for counselor attention
 */
export class ProactiveSupport {
  private riskAssessment: RiskAssessment;
  private communication: CommunicationManager;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(riskAssessment: RiskAssessment, communication: CommunicationManager) {
    this.riskAssessment = riskAssessment;
    this.communication = communication;
  }

  /**
   * Start monitoring student status
   */
  async startMonitoring(intervalMinutes: number = 60): Promise<void> {
    if (this.monitoringInterval) {
      throw new Error('Monitoring is already active');
    }

    // Initial check
    await this.monitorStudentStatus();

    // Set up periodic monitoring
    this.monitoringInterval = setInterval(
      () => this.monitorStudentStatus(),
      intervalMinutes * 60 * 1000
    );
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  /**
   * Monitor all students for risk factors and needed interventions
   */
  async monitorStudentStatus(): Promise<void> {
    try {
      // Get all students
      const students = await this.getAllStudents();

      // Analyze each student
      for (const student of students) {
        const riskLevel = await this.riskAssessment.analyzeStudentData(student);
        
        if (riskLevel !== 'low') {
          await this.handleAtRiskStudent(student, riskLevel);
        }
      }
    } catch (error) {
      console.error('Error in student monitoring:', error);
      // Notify counselors of system issues
      await this.communication.notifyCounselors({
        type: 'system_alert',
        message: 'Error in student monitoring system',
        severity: 'high'
      });
    }
  }

  /**
   * Prioritize cases based on risk level and available resources
   */
  async prioritizeCases(): Promise<Student[]> {
    const students = await this.getAllStudents();
    
    // Sort by risk level and last intervention
    return students.sort((a, b) => {
      const riskA = this.getRiskScore(a);
      const riskB = this.getRiskScore(b);
      
      if (riskA !== riskB) {
        return riskB - riskA; // Higher risk first
      }
      
      // If risk is equal, prioritize those who haven't been seen recently
      return new Date(a.lastIntervention).getTime() - new Date(b.lastIntervention).getTime();
    });
  }

  private async handleAtRiskStudent(student: Student, riskLevel: RiskLevel): Promise<void> {
    // Get suggested interventions
    const interventions = await this.riskAssessment.suggestInterventions(student, riskLevel);
    
    // Prioritize interventions
    const prioritizedInterventions = this.prioritizeInterventions(interventions);
    
    // Schedule follow-ups
    await this.scheduleFollowUps(student, prioritizedInterventions);
    
    // Notify counselors
    await this.notifyCounselors(student, riskLevel, prioritizedInterventions);
  }

  private async getAllStudents(): Promise<Student[]> {
    // TODO: Implement student data retrieval
    return [];
  }

  private getRiskScore(student: Student): number {
    // Convert risk level to numeric score
    const riskScores = {
      low: 1,
      medium: 2,
      high: 3
    };
    return riskScores[student.riskLevel] || 0;
  }

  private prioritizeInterventions(interventions: Intervention[]): Intervention[] {
    return interventions.sort((a, b) => {
      // Sort by urgency and effectiveness
      if (a.urgency !== b.urgency) {
        return b.urgency - a.urgency;
      }
      return b.effectiveness - a.effectiveness;
    });
  }

  private async scheduleFollowUps(
    student: Student,
    interventions: Intervention[]
  ): Promise<void> {
    for (const intervention of interventions) {
      if (intervention.requiresFollowUp) {
        await this.communication.scheduleFollowUp({
          studentId: student.id,
          interventionId: intervention.id,
          dueDate: this.calculateFollowUpDate(intervention)
        });
      }
    }
  }

  private async notifyCounselors(
    student: Student,
    riskLevel: RiskLevel,
    interventions: Intervention[]
  ): Promise<void> {
    await this.communication.notifyCounselors({
      type: 'student_risk_alert',
      studentId: student.id,
      riskLevel,
      interventions,
      urgency: this.getUrgencyLevel(riskLevel)
    });
  }

  private calculateFollowUpDate(intervention: Intervention): Date {
    const now = new Date();
    // Add follow-up period based on intervention type
    const followUpDays = intervention.followUpPeriod || 7;
    return new Date(now.setDate(now.getDate() + followUpDays));
  }

  private getUrgencyLevel(riskLevel: RiskLevel): 'low' | 'medium' | 'high' {
    return riskLevel === 'high' ? 'high' : riskLevel === 'medium' ? 'medium' : 'low';
  }
} 
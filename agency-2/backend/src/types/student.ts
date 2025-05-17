export type RiskLevel = 'low' | 'medium' | 'high';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  riskLevel: RiskLevel;
  lastIntervention: Date;
  interventions: Intervention[];
  academicData?: AcademicData;
  attendanceData?: AttendanceData;
  behavioralData?: BehavioralData;
  socialEmotionalData?: SocialEmotionalData;
}

export interface Intervention {
  id: string;
  type: string;
  description: string;
  urgency: number;
  effectiveness: number;
  requiresFollowUp: boolean;
  followUpPeriod?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface AcademicData {
  gpa?: number;
  courses: Course[];
  grades: Grade[];
  standardizedTests: StandardizedTest[];
}

export interface AttendanceData {
  absences: number;
  tardies: number;
  excusedAbsences: number;
  attendanceRate: number;
  lastAttendance: Date;
}

export interface BehavioralData {
  incidents: Incident[];
  referrals: Referral[];
  positiveBehaviors: PositiveBehavior[];
}

export interface SocialEmotionalData {
  assessments: Assessment[];
  supportServices: SupportService[];
  riskFactors: RiskFactor[];
}

export interface Course {
  id: string;
  name: string;
  grade: number;
  credits: number;
  status: 'active' | 'completed' | 'dropped';
}

export interface Grade {
  courseId: string;
  term: string;
  grade: number;
  date: Date;
}

export interface StandardizedTest {
  name: string;
  date: Date;
  score: number;
  percentile?: number;
}

export interface Incident {
  id: string;
  date: Date;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

export interface Referral {
  id: string;
  date: Date;
  reason: string;
  status: 'pending' | 'in_progress' | 'resolved';
  assignedTo?: string;
}

export interface PositiveBehavior {
  id: string;
  date: Date;
  type: string;
  description: string;
  recognizedBy: string;
}

export interface Assessment {
  id: string;
  date: Date;
  type: string;
  score: number;
  notes?: string;
}

export interface SupportService {
  id: string;
  type: string;
  startDate: Date;
  endDate?: Date;
  provider: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface RiskFactor {
  type: string;
  severity: RiskLevel;
  identifiedDate: Date;
  status: 'active' | 'resolved';
  notes?: string;
} 
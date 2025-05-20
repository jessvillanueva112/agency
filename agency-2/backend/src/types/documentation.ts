export interface Note {
  studentId: string;
  date: Date | string;
  type: string;
  summary: string;
  followUpNeeded?: boolean;
  attachments?: string[];
  externalProviderNotes?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  factors?: string[];
  interventionPlan?: string;
  previousAssessments?: any[];
  externalProviderInput?: any;
  metadata?: {
    standardized: boolean;
    standardizedAt: Date;
    version: string;
  };
  [key: string]: any;
}

export interface NoteTemplate {
  requiredFields: string[];
  optionalFields: string[];
  format: {
    [key: string]: {
      minLength?: number;
      maxLength?: number;
      type?: string;
      enum?: string[];
      minItems?: number;
    };
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
} 
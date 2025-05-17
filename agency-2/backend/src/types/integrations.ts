export interface ProviderConfig {
  name: string;
  apiEndpoint: string;
  requiredConsent: string[];
  dataRetention: number;
  encryption: boolean;
}

export interface ExternalProviderData {
  studentId: string;
  provider: string;
  timestamp: Date;
  data: {
    [key: string]: any;
  };
  metadata?: {
    source: string;
    version: string;
    encrypted: boolean;
  };
}

export interface DataRequest {
  provider: string;
  studentId: string;
  requestedFields: string[];
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
} 
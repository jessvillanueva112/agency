import { PrivacyManager } from '../core/privacy/consent';
import { DataSyncManager } from '../core/data/sync';
import { EHRService } from './ehr';
import { MyEdBCService } from './myedbc';
import { EmailService } from './email';
import { ExternalProviderData, ProviderConfig } from '../types/integrations';

/**
 * Manages secure data sharing with external providers (hospitals, clinics, etc.)
 */
export class ExternalProviderManager {
  private providers: Map<string, ProviderConfig>;
  private privacyManager: PrivacyManager;
  private dataSync: DataSyncManager;
  
  // Integration services
  public readonly ehr: EHRService;
  public readonly myedbc: MyEdBCService;
  public readonly email: EmailService;

  constructor(privacyManager: PrivacyManager, dataSync: DataSyncManager) {
    this.providers = new Map();
    this.privacyManager = privacyManager;
    this.dataSync = dataSync;
    
    // Initialize integration services
    this.ehr = new EHRService();
    this.myedbc = new MyEdBCService();
    this.email = new EmailService();
    
    this.initializeProviders();
  }

  private initializeProviders() {
    // Configure known external providers
    this.providers.set('hospital_ehr', {
      name: 'BC Children\'s Hospital EHR',
      apiEndpoint: process.env.HOSPITAL_EHR_API,
      requiredConsent: ['medical_records', 'treatment_history'],
      dataRetention: 30, // days
      encryption: true
    });

    this.providers.set('myedbc', {
      name: 'MyEdBC',
      apiEndpoint: process.env.MYEDBC_API,
      requiredConsent: ['academic_records', 'attendance'],
      dataRetention: 365, // days
      encryption: true
    });
  }

  /**
   * Import EHR record for a student
   */
  async importEHRRecord(studentId: string): Promise<ExternalProviderData> {
    const provider = 'hospital_ehr';
    const providerConfig = this.providers.get(provider);
    
    if (!providerConfig) {
      throw new Error(`Unknown provider: ${provider}`);
    }

    // Check consent
    const hasConsent = await this.privacyManager.checkConsentStatus(
      studentId,
      providerConfig.requiredConsent
    );

    if (!hasConsent) {
      throw new Error(`Missing required consent for ${provider}`);
    }

    try {
      // Fetch EHR data
      const ehrData = await this.ehr.fetchEHRSummary(studentId);
      
      // Store and log
      await this.receiveData(provider, {
        studentId,
        provider,
        data: ehrData,
        timestamp: new Date()
      });

      return ehrData;
    } catch (error) {
      throw new Error(`Failed to import EHR record: ${error.message}`);
    }
  }

  /**
   * Import MyEdBC student data
   */
  async importMyEdBCStudent(studentId: string): Promise<ExternalProviderData> {
    const provider = 'myedbc';
    const providerConfig = this.providers.get(provider);
    
    if (!providerConfig) {
      throw new Error(`Unknown provider: ${provider}`);
    }

    // Check consent
    const hasConsent = await this.privacyManager.checkConsentStatus(
      studentId,
      providerConfig.requiredConsent
    );

    if (!hasConsent) {
      throw new Error(`Missing required consent for ${provider}`);
    }

    try {
      // Fetch MyEdBC data
      const myedbcData = await this.myedbc.fetchStudentData(studentId);
      
      // Store and log
      await this.receiveData(provider, {
        studentId,
        provider,
        data: myedbcData,
        timestamp: new Date()
      });

      return myedbcData;
    } catch (error) {
      throw new Error(`Failed to import MyEdBC data: ${error.message}`);
    }
  }

  /**
   * Receive and process data from external providers
   */
  private async receiveData(provider: string, data: ExternalProviderData): Promise<void> {
    const providerConfig = this.providers.get(provider);
    if (!providerConfig) {
      throw new Error(`Unknown provider: ${provider}`);
    }

    // Validate data structure
    this.validateProviderData(data);

    // Store securely
    await this.dataSync.storeExternalData(provider, data);

    // Update student profile
    await this.updateStudentProfile(data);

    // Log the data receipt
    await this.privacyManager.logDataUsage('external_data_received', {
      provider,
      studentId: data.studentId,
      timestamp: new Date()
    });
  }

  private validateProviderData(data: ExternalProviderData): void {
    if (!data.studentId || !data.provider || !data.timestamp) {
      throw new Error('Invalid provider data structure');
    }
  }

  private async updateStudentProfile(data: ExternalProviderData): Promise<void> {
    // TODO: Update student profile with new external data
    // This would merge the data with existing student records
    await this.dataSync.updateStudentProfile(data.studentId, data);
  }
}
import { PrivacyManager } from '../core/privacy/consent';
import { DataSyncManager } from '../core/data/sync';
import { EHRService } from './ehr';
import { MyEdBCService } from './myedbc';
import { EmailService } from './email';
import { ExternalProviderData, ProviderConfig } from '../types/integrations';

export class ExternalProviderManager {
  private providers: Map<string, ProviderConfig>;
  private privacyManager: PrivacyManager;
  private dataSync: DataSyncManager;

  public readonly ehr: EHRService;
  public readonly myedbc: MyEdBCService;
  public readonly email: EmailService;

  constructor(privacyManager: PrivacyManager, dataSync: DataSyncManager) {
    this.providers = new Map();
    this.privacyManager = privacyManager;
    this.dataSync = dataSync;

    this.ehr = new EHRService();
    this.myedbc = new MyEdBCService();
    this.email = new EmailService();

    this.initializeProviders();
  }

  private initializeProviders() {
    this.providers.set('hospital_ehr', {
      name: 'BC Children\'s Hospital EHR',
      apiEndpoint: process.env.HOSPITAL_EHR_API || '',
      requiredConsent: ['medical_records', 'treatment_history'],
      dataRetention: 30,
      encryption: true
    });

    this.providers.set('myedbc', {
      name: 'MyEdBC',
      apiEndpoint: process.env.MYEDBC_API || '',
      requiredConsent: ['academic_records', 'attendance'],
      dataRetention: 365,
      encryption: true
    });
  }

  async importEHRRecord(studentId: string): Promise<ExternalProviderData> {
    const provider = 'hospital_ehr';
    const providerConfig = this.providers.get(provider);

    if (!providerConfig) throw new Error(`Unknown provider: ${provider}`);

    for (const consentType of providerConfig.requiredConsent) {
      const hasConsent = await this.privacyManager.checkConsentStatus(studentId, consentType);
      if (!hasConsent) throw new Error(`Missing required consent: ${consentType} for ${provider}`);
    }

    try {
      const ehrData = await this.ehr.fetchEHRSummary(studentId);

      await this.receiveData(provider, {
        studentId,
        provider,
        data: ehrData,
        timestamp: new Date()
      });

      return { studentId, provider, data: ehrData, timestamp: new Date() };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to import EHR record: ${message}`);
    }
  }

  async importMyEdBCStudent(studentId: string): Promise<ExternalProviderData> {
    const provider = 'myedbc';
    const providerConfig = this.providers.get(provider);

    if (!providerConfig) throw new Error(`Unknown provider: ${provider}`);

    for (const consentType of providerConfig.requiredConsent) {
      const hasConsent = await this.privacyManager.checkConsentStatus(studentId, consentType);
      if (hasConsent === false) throw new Error(`Missing required consent: ${consentType} for ${provider}`);
    }

    try {
      const myedbcData = await this.myedbc.fetchStudentData(studentId);

      await this.receiveData(provider, {
        studentId,
        provider,
        data: myedbcData,
        timestamp: new Date()
      });

      return { studentId, provider, data: myedbcData, timestamp: new Date() };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to import MyEdBC data: ${message}`);
    }
  }

  private async receiveData(provider: string, data: ExternalProviderData): Promise<void> {
    const providerConfig = this.providers.get(provider);
    if (!providerConfig) throw new Error(`Unknown provider: ${provider}`);

    this.validateProviderData(data);

    await this.dataSync.storeExternalData(provider, data);
    await this.dataSync.updateStudentProfile(data.studentId, data);

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
}
import express from 'express';
import { PrivacyManager } from '../core/privacy/consent';
import { DataSyncManager } from '../core/data/sync';
import { ExternalProviderManager } from '../integrations/external_providers';

const router = express.Router();
const privacyManager = new PrivacyManager();
const dataSync = new DataSyncManager();
const externalProviders = new ExternalProviderManager(privacyManager, dataSync);

// EHR Sync Endpoint
router.post('/ehr', async (req, res) => {
  try {
    const { studentId } = req.body;
    const result = await externalProviders.importEHRRecord(studentId);
    res.json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// MyEdBC Sync Endpoint
router.post('/myedbc', async (req, res) => {
  try {
    const { studentId } = req.body;
    const result = await externalProviders.importMyEdBCStudent(studentId);
    res.json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

export default router;
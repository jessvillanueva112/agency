import express from 'express';
import { AgencyAssistant } from '../core/ai/assistant';

const router = express.Router();

// POST /api/ai-assistant/demo
router.post('/demo', async (req, res) => {
  try {
    const { input, context } = req.body;
    const assistant = new AgencyAssistant();
    const result = await assistant.processAIOrchestration(input, context);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

export default router; 
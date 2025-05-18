import express from 'express';
import AuditLog from '../models/auditLog';

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
    res.json({ message: 'AuditLog route is working!' });
  });

// CREATE
router.post('/', async (req, res) => {
  try {
    const auditLog = new AuditLog(req.body);
    await auditLog.save();
    res.status(201).json(auditLog);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const auditLogs = await AuditLog.find();
  res.json(auditLogs);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const auditLog = await AuditLog.findById(req.params.id);
  if (!auditLog) return res.status(404).json({ error: 'Not found' });
  res.json(auditLog);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const auditLog = await AuditLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!auditLog) return res.status(404).json({ error: 'Not found' });
  res.json(auditLog);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await AuditLog.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
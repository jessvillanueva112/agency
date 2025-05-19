import express from 'express';
import Incident from '../models/incident';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Incident route is working!' });
});

router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

router.get('/:id', async (req, res) => {
  const incident = await Incident.findById(req.params.id);
  if (!incident) return res.status(404).json({ error: 'Not found' });
  res.json(incident);
});

router.put('/:id', async (req, res) => {
  const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!incident) return res.status(404).json({ error: 'Not found' });
  res.json(incident);
});

router.delete('/:id', async (req, res) => {
  const result = await Incident.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
import express from 'express';
import Assessment from '../models/assessment';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Assessment route is working!' });
});

router.post('/', async (req, res) => {
  try {
    const assessment = new Assessment(req.body);
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

router.get('/', async (req, res) => {
  const assessments = await Assessment.find();
  res.json(assessments);
});

router.get('/:id', async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  res.json(assessment);
});

router.put('/:id', async (req, res) => {
  const assessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  res.json(assessment);
});

router.delete('/:id', async (req, res) => {
  const result = await Assessment.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
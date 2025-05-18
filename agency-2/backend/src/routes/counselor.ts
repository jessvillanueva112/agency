import express from 'express';
import Counselor from '../models/counselor';

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
    res.json({ message: 'Counselor route is working!' });
  });

// CREATE
router.post('/', async (req, res) => {
  try {
    const counselor = new Counselor(req.body);
    await counselor.save();
    res.status(201).json(counselor);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const counselors = await Counselor.find();
  res.json(counselors);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const counselor = await Counselor.findById(req.params.id);
  if (!counselor) return res.status(404).json({ error: 'Not found' });
  res.json(counselor);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const counselor = await Counselor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!counselor) return res.status(404).json({ error: 'Not found' });
  res.json(counselor);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Counselor.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
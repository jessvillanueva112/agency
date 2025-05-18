import express from 'express';
import Communication from '../models/communication';

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
    res.json({ message: 'Communication route is working!' });
  });

// CREATE
router.post('/', async (req, res) => {
  try {
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const communications = await Communication.find();
  res.json(communications);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const communication = await Communication.findById(req.params.id);
  if (!communication) return res.status(404).json({ error: 'Not found' });
  res.json(communication);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const communication = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!communication) return res.status(404).json({ error: 'Not found' });
  res.json(communication);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Communication.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
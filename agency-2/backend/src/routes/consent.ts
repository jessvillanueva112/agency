import express from 'express';
import Consent from '../models/consent';

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
    res.json({ message: 'Consent route is working!' });
  });

// CREATE
router.post('/', async (req, res) => {
  try {
    const consent = new Consent(req.body);
    await consent.save();
    res.status(201).json(consent);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const consents = await Consent.find();
  res.json(consents);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const consent = await Consent.findById(req.params.id);
  if (!consent) return res.status(404).json({ error: 'Not found' });
  res.json(consent);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const consent = await Consent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!consent) return res.status(404).json({ error: 'Not found' });
  res.json(consent);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Consent.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
import express from 'express';
import Event from '../models/event';

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
    res.json({ message: 'Event route is working!' });
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(event);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(event);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Event.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
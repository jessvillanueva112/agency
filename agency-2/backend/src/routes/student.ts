import express from 'express';
import Student from '../models/student'; // <-- lowercase

const router = express.Router();

// Debug route to verify loading
router.get('/test', (req, res) => {
  res.json({ message: 'Student route is working!' });
});

// CREATE a student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// READ all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// READ one student
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
});

// UPDATE a student
router.put('/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  const result = await Student.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
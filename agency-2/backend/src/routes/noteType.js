const express = require('express');
const getNoteTypePrediction = require('../utils/noteTypePrediction');
const logAudit = require('../utils/auditLogger');

const router = express.Router();

router.post('/api/note-type', async (req, res) => {
  const { text, studentId } = req.body;
  try {
    const result = await getNoteTypePrediction(text);

    // Log to blockchain
    await logAudit('note_type_prediction', JSON.stringify({ studentId, text, result }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Note type prediction failed' });
  }
});

module.exports = router;
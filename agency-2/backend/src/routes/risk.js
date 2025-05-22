const express = require('express');
const getRiskPrediction = require('../utils/riskPrediction');
const logAudit = require('../utils/auditLogger'); // <-- Import here

const router = express.Router();

router.post('/api/risk', async (req, res) => {
  const { grade, riskLevel_num, studentId } = req.body;
  try {
    const prediction = await getRiskPrediction(grade, riskLevel_num);

    // Log to blockchain after getting the result
    await logAudit('risk_prediction', JSON.stringify({ studentId, prediction }));

    res.json(prediction);
  } catch (err) {
    res.status(500).json({ error: 'Risk prediction failed' });
  }
});

module.exports = router;
const axios = require('axios');

async function getRiskPrediction(grade, riskLevel_num) {
  try {
    const response = await axios.post('http://localhost:5001/predict-risk', {
      grade,
      riskLevel_num
    });
    return response.data;
  } catch (err) {
    console.error('Risk prediction API error:', err.message);
    throw err;
  }
}

module.exports = getRiskPrediction;
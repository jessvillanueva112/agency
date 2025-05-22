const axios = require('axios');

async function getNoteTypePrediction(text) {
  try {
    const response = await axios.post('http://localhost:5002/predict-note-type', { text });
    return response.data; // { noteType: "crisis" }
  } catch (err) {
    console.error('Note type prediction API error:', err.message);
    throw err;
  }
}

module.exports = getNoteTypePrediction;
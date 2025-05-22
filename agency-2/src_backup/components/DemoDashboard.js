// agency-2/frontend/src/components/DemoDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

export default function DemoDashboard() {
  const [text, setText] = useState('');
  const [noteType, setNoteType] = useState('');
  const [risk, setRisk] = useState(null);

  const handleNLP = async () => {
    const res = await axios.post('/api/note-type', { text });
    setNoteType(res.data.noteType);
  };

  const handleRisk = async () => {
    const res = await axios.post('/api/risk', { grade: 11, riskLevel_num: 2 });
    setRisk(res.data);
  };

  return (
    <div>
      <h2>AI Demo Dashboard</h2>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter note text" />
      <button onClick={handleNLP}>Classify Note Type</button>
      <div>Note Type: {noteType}</div>
      <button onClick={handleRisk}>Get Risk Prediction</button>
      <div>Risk: {risk && JSON.stringify(risk)}</div>
    </div>
  );
}
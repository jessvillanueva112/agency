const express = require('express');
const bodyParser = require('body-parser');
const riskRoutes = require('./routes/risk');
const noteTypeRoutes = require('./routes/noteType');

const app = express();
app.use(bodyParser.json());

app.use(riskRoutes);
app.use(noteTypeRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Node.js backend running on port ${PORT}`);
});
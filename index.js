const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let temperature = 26.2;
let lastUpdated = new Date().toISOString();

app.get('/pool-temp', (req, res) => {
  res.json({ temperature, lastUpdated });
});

app.post('/update-temp', (req, res) => {
  const newTemp = parseFloat(req.body.temp);
  if (!isNaN(newTemp)) {
    temperature = newTemp;
    lastUpdated = new Date().toISOString();
    res.json({ status: 'updated', temperature, lastUpdated });
  } else {
    res.status(400).json({ error: 'Invalid temperature' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure analytics directory exists
const ANALYTICS_DIR = './analytics_data';
if (!fs.existsSync(ANALYTICS_DIR)) {
  fs.mkdirSync(ANALYTICS_DIR);
}

app.post('/analytics', (req, res) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = path.join(ANALYTICS_DIR, `analytics_${timestamp}.json`);
  
  let data = [];
  if (fs.existsSync(filename)) {
    data = JSON.parse(fs.readFileSync(filename));
  }
  
  data.push({
    ...req.body,
    timestamp: new Date().toISOString()
  });
  
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Analytics server running on port ${PORT}`);
});

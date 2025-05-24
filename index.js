const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let latestPostReceived = null;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route to receive POST data from your device
app.post('/track', (req, res) => {
  console.log('🚀 Received POST:', req.body);
  latestPostReceived = req.body;
  res.status(200).json({ status: 'received' });
});

// Route to display the latest POSTed data
app.get('/test-log', (req, res) => {
  if (latestPostReceived) {
    res.json(latestPostReceived);
  } else {
    res.send('No data received yet.');
  }
});

// Optional root handler
app.get('/', (req, res) => {
  res.send('Trackblock server is live.');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡ Trackblock backend running on port ${PORT}`);
});
{
  "name": "trackblock-server",
  "version": "1.0.0",
  "description": "Trackblock endpoint for receiving and viewing ESP32 data",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=14"
  },
  "license": "MIT"
}

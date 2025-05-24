const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Store the latest POST payload
let latestPostReceived = null;

// POST endpoint to receive ESP32 payload
app.post("/track", (req, res) => {
  console.log("📦 POST received from device:", req.body);
  latestPostReceived = req.body;
  res.send("✅ Data received successfully");
});

// GET endpoint to view the latest POST data
app.get("/test-log", (req, res) => {
  if (latestPostReceived) {
    res.json(latestPostReceived);
  } else {
    res.send("No data received yet.");
  }
});

// Optional default fallback
app.get("/", (req, res) => {
  res.send("✅ Trackblock server running.");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Trackblock backend listening on port ${port}`);
});

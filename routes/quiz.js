const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const resultsFile = path.join(__dirname, '../data/results.json');

// Ensure the file exists
if (!fs.existsSync(resultsFile)) {
  fs.writeFileSync(resultsFile, JSON.stringify([]));
}

// Handle POST /api/quiz/results
router.post('/results', (req, res) => {
  const { username, score, date } = req.body;

  if (!username || score === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const results = JSON.parse(fs.readFileSync(resultsFile));
  const newResult = {
    id: Date.now().toString(),
    username,
    score,
    date: date || new Date().toISOString(),
  };

  results.push(newResult);
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

  res.status(201).json({ message: 'Result saved successfully', result: newResult });
});

module.exports = router;

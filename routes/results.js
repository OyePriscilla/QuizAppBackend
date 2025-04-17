const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const resultsFile = path.join(__dirname, '../data/results.json');

// Helper
const getResults = () => JSON.parse(fs.readFileSync(resultsFile));

// POST /api/results
router.post('/', (req, res) => {
  const { userId, quizTitle, score, total } = req.body;

  const newResult = {
    id: Date.now().toString(),
    userId,
    quizTitle,
    score,
    total,
    timestamp: new Date().toISOString()
  };

  const results = getResults();
  results.push(newResult);
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

  res.status(201).json({ message: 'Result saved', resultId: newResult.id });
});

// ✅ New GET route to fetch all results (for admin)
router.get('/', (req, res) => {
  const results = getResults();
  res.json(results);
});

// GET /api/results/:userId
router.get('/:userId', (req, res) => {
  const results = getResults();
  const userResults = results.filter(r => r.userId === req.params.userId);
  res.json(userResults);
});

module.exports = router;

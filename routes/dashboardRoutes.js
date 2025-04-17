const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to quizResults.json
const resultsFilePath = path.join(__dirname, '../data/quizResults.json');

// Utility function to safely read JSON file
function getResults() {
  try {
    if (!fs.existsSync(resultsFilePath)) return [];
    const data = fs.readFileSync(resultsFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading results file:", error);
    return [];
  }
}

// ✅ Admin: GET all results
router.get('/', (req, res) => {
  const results = getResults();
  res.json(results);
});

// ✅ User: GET results by username
router.get('/:username', (req, res) => {
  const username = req.params.username;
  const results = getResults();

  const userResults = results.filter(result => result.username === username);

  if (userResults.length === 0) {
    return res.status(404).json({ message: 'No quiz results found for the user.' });
  }

  res.json(userResults);
});

// ✅ Save new quiz result
router.post('/save', (req, res) => {
  const newResult = req.body;
  const results = getResults();

  results.push(newResult);

  fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2), (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ message: 'Failed to save the result.' });
    }

    res.status(201).json({ message: 'Quiz result saved successfully.' });
  });
});

// DELETE result by ID
router.delete('/:id', (req, res) => {
  const resultId = req.params.id;
  const results = getResults();
  const filteredResults = results.filter((r) => r.id !== resultId);

  fs.writeFileSync(resultsFilePath, JSON.stringify(filteredResults, null, 2));
  res.status(200).json({ message: 'Result deleted successfully.' });
});


module.exports = router;

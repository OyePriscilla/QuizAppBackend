const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to quizResults.json
const resultsFilePath = path.join(__dirname, '../data/quizResults.json');

// GET request to fetch all quiz results for a specific user
router.get('/:username', (req, res) => {
  const username = req.params.username;

  // Read the results from the JSON file
  fs.readFile(resultsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read the results file.' });
    }

    let results;
    try {
      results = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ message: 'Failed to parse the results file.' });
    }

    const userResults = results.filter(result => result.username === username);

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'No quiz results found for the user.' });
    }

    res.json(userResults);  // Send user results in the response
  });
});

// POST request to save quiz results
router.post('/save', (req, res) => {
  const newResult = req.body;

  // Read the current results from the JSON file
  fs.readFile(resultsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read the results file.' });
    }

    let results;
    try {
      results = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ message: 'Failed to parse the results file.' });
    }

    // Append the new result to the existing results
    results.push(newResult);

    // Write the updated results back to the JSON file
    fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ message: 'Failed to save the result.' });
      }

      res.status(201).json({ message: 'Quiz result saved successfully.' });
    });
  });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Path to the JSON file where quiz results are stored
const resultsFilePath = path.join(__dirname, 'quizResults.json');

// API to get all quiz results for a specific user
app.get('/api/dashboard/:username', (req, res) => {
  const username = req.params.username;

  // Read the stored quiz results from the JSON file
  fs.readFile(resultsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve quiz results.' });
    }

    const results = JSON.parse(data);
    const userResults = results.filter(result => result.username === username);
    res.json(userResults);
  });
});

// API to save quiz results for a user
app.post('/api/quiz/results', (req, res) => {
  const { username, score, date, quizState } = req.body;

  // Read the stored quiz results from the JSON file
  fs.readFile(resultsFilePath, 'utf8', (err, data) => {
    let results = [];
    if (!err && data) {
      results = JSON.parse(data);
    }

    // Add the new quiz result to the array
    const newResult = { username, score, date, quizState };
    results.push(newResult);

    // Write the updated results back to the JSON file
    fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save quiz results.' });
      }
      res.status(201).json({ message: 'Quiz result saved successfully!' });
    });
  });
});

module.export = router;
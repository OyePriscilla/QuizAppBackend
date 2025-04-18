// routes/quiz.js
const express = require('express');
const router = express.Router();
const db = require('../firebase');

// Save new quiz result
router.post('/save', async (req, res) => {
  try {
    const data = req.body;
    await db.collection('quizResults').add(data);
    res.status(201).json({ message: 'Quiz result saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving result', error });
  }
});

// GET all results (Admin)
router.get('/', async (req, res) => {
  const snapshot = await db.collection('quizResults').get();
  const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(results);
});

// GET results by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const snapshot = await db.collection('quizResults').where('username', '==', username).get();

  if (snapshot.empty) {
    return res.status(404).json({ message: 'No quiz results found for the user.' });
  }

  const userResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(userResults);
});

// DELETE result by ID
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('quizResults').doc(req.params.id).delete();
    res.json({ message: 'Result deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;

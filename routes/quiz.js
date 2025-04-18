const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint to save quiz result
router.post('/save', async (req, res) => {
  const { username, quizTitle, score, total } = req.body;

  try {
    await db.collection('quizResults').add({
      username,
      quizTitle,
      score,
      total,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'Quiz result saved successfully' });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({ message: 'Failed to save the result' });
  }
});

module.exports = router;

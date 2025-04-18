const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Endpoint to fetch all quiz results (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('quizResults').orderBy('timestamp', 'desc').get();
    const allResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(allResults);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

module.exports = router;

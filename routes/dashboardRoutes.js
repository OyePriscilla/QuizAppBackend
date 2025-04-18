router.get('/', async (req, res) => {
  const snapshot = await db.collection('results').orderBy('timestamp', 'desc').get();
  const allResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(allResults);
});

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Endpoint to save quiz result
router.post('/save', async (req, res) => {
  const { username, quizTitle, score, total } = req.body;

  try {
    // Save the response to Firestore in a collection named "quizResults"
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

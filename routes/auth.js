const express = require('express');
const router = express.Router();
const db = require('../firebase'); // Assuming you're using Firestore

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const userRef = db.collection('users');
  const existing = await userRef.where('username', '==', username).get();

  if (!existing.empty) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = await userRef.add({ username, password });
  res.status(201).json({ message: 'Signup successful', userId: newUser.id });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await db.collection('users').where('username', '==', username).where('password', '==', password).get();

  if (users.empty) return res.status(401).json({ message: 'Invalid credentials' });

  const user = users.docs[0];
  res.json({ message: 'Login successful', userId: user.id });
});

module.exports = router;

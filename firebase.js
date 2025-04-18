// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // path to downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;

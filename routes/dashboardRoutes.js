router.get('/', async (req, res) => {
  const snapshot = await db.collection('results').orderBy('timestamp', 'desc').get();
  const allResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(allResults);
});

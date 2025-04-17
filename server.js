const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Existing routes
const authRoutes = require('./routes/auth');

// ✅ Import quiz routes
const quizRoutes = require('./routes/quiz');

app.use('/api/auth', authRoutes);

// ✅ Use quiz route
app.use('/api/quiz', quizRoutes);

// Import routes
const dashboardRoutes = require('./routes/dashboardRoutes');

// Use the dashboard routes
app.use('/api/dashboard', dashboardRoutes);

const resultsRoutes = require('./routes/dashboardRoutes'); // or ./routes/results if that's the filename
app.use('/api/results', resultsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

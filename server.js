const express = require('express');
const router = express.Router();  // This is the line that initializes the router

const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/api/auth', require('./routes/auth')); // For signup, login
app.use('/api/quiz', require('./routes/quiz')); // For saving quiz results
app.use('/api/results', require('./routes/dashboardRoutes')); // For managing and viewing quiz results

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

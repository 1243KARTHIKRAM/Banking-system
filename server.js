const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Enable JSON parsing
app.use(express.json());

// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Enable cookie-parser
app.use(cookieParser());

// Mount routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start server on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../config/database');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { uid, username, password, email, phone, role } = req.body;

    // Validate required fields
    if (!uid || !username || !password || !email || !phone || !role) {
      return res.status(400).json({ error: 'All fields are required: uid, username, password, email, phone, role' });
    }

    // Allow only role = Customer
    if (role !== 'Customer') {
      return res.status(400).json({ error: 'Only Customer role is allowed' });
    }

    // Encrypt password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into KodUser table with default balance of 100000
    const query = `
      INSERT INTO KodUser (uid, username, password, email, phone, role, balance)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [uid, username, hashedPassword, email, phone, role, 100000];

    await pool.execute(query, values);

    // Return success message
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully' 
    });

  } catch (error) {
    // Handle duplicate username error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Fetch user from KodUser table
    const query = 'SELECT * FROM KodUser WHERE username = ?';
    const [users] = await pool.execute(query, [username]);

    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users[0];

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' }
    );

    // Calculate token expiry (1 hour from now)
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // Store token in UserToken table
    const tokenQuery = `
      INSERT INTO UserToken (username, token, expiry)
      VALUES (?, ?, ?)
    `;
    await pool.execute(tokenQuery, [user.username, token, tokenExpiry]);

    // Send token in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      expires: tokenExpiry,
      sameSite: 'lax'
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

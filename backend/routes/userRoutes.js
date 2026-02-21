const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const pool = require('../../config/database');

// Get user balance - protected endpoint
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const username = req.username;
    
    // Fetch user balance from KodUser table
    const query = 'SELECT username, balance FROM KodUser WHERE username = ?';
    const [users] = await pool.execute(query, [username]);
    
    // Check if user exists
    if (users.length === 0) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    const user = users[0];
    
    // Return balance JSON
    res.status(200).json({
      username: user.username,
      balance: user.balance
    });
    
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

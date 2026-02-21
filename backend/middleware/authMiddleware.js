const jwt = require('jsonwebtoken');

/**
 * JWT Authentication Middleware
 * 
 * Extracts token from cookie, verifies JWT, checks expiry,
 * extracts username from subject, and attaches to request.
 * Returns 401 if invalid or expired.
 */
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No token provided' 
      });
    }

    // Verify JWT using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

    // Extract username from subject (sub claim)
    const username = decoded.sub;

    if (!username) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token missing subject claim' 
      });
    }

    // Attach username to request object
    req.username = username;
    
    // Also attach the full decoded payload for additional user data if needed
    req.user = decoded;

    next();
  } catch (error) {
    // Handle token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please log in again.' 
      });
    }

    // Handle invalid token
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'The provided token is invalid' 
      });
    }

    // Handle other errors
    return res.status(401).json({ 
      error: 'Authentication failed',
      message: 'Unable to verify authentication' 
    });
  }
};

module.exports = authMiddleware;
